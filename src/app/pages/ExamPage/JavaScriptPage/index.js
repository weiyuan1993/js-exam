import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import Grid from 'app/components/Grid';
import GridItem from 'app/components/Grid/GridItem';
import ConsoleWidget from 'app/components/Widgets/ConsoleWidget';
import CodeWidget from 'app/components/Widgets/CodeWidget';
import TestWidget from 'app/components/Widgets/TestWidget';
import TapeWidget from 'app/components/Widgets/TapeWidget';
import ControlWidget from 'app/components/Widgets/ControlWidget';

import { addTape, resetTape } from 'app/actions/tape';
import { resetConsole } from 'app/actions/console';

import { getQuestions } from 'app/questions/index';

import debouncedRunCode from 'app/utils/runCode';
import { getStateInformation } from 'app/utils/stateHelper';

import styles from './JavaScriptPage.module.scss';

const questions = getQuestions('javascript');

class JavaScriptPage extends Component {
  constructor(props) {
    super(props);
    this.controlHeight = 70;
  }

  componentDidMount() {
    const { compiledCode, wrappedConsole, actions } = this.props;
    actions.resetConsole();
    debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: actions.addTape });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode } = this.props;
    const { compiledCode, wrappedConsole, actions } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      actions.resetConsole();
      actions.resetTape();
      debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: actions.addTape });
    }
    return true;
  }

  render() {
    const {
      code,
      questionIndex,
      handleCodeChange,
      tape,
      console: _console
    } = this.props;
    const { test } = questions[questionIndex];
    const layout = [
      {
        key: 'code', x: 0, y: 0, width: window.innerWidth / 2, height: window.innerHeight / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'test', x: 0, y: 1, width: window.innerWidth / 2, height: window.innerHeight / 2, minWidth: 100, maxWidth: 700
      },
      {
        key: 'control', x: 1, y: 0, width: window.innerWidth / 2, height: this.controlHeight, static: true
      },
      {
        key: 'tape', x: 1, y: 1, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'console', x: 1, y: 2, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
    ];
    return (
      <div className={styles.app}>
        <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
          <GridItem key="code">
            <CodeWidget
              handleCodeChange={handleCodeChange}
              data={code}
              mode="javascript"
              theme="monokai"
            />
          </GridItem>
          <GridItem key="test">
            <TestWidget data={test} />
          </GridItem>
          <GridItem key="control">
            <ControlWidget type="javascript" />
          </GridItem>
          <GridItem key="tape">
            <TapeWidget data={tape} />
          </GridItem>
          <GridItem key="console">
            <ConsoleWidget data={_console} />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect(
  (state) => {
    const { code, questionIndex, compiledCode } = getStateInformation(state);
    return {
      compiledCode,
      questionIndex,
      code,
      tape: state.tape,
      console: state.console
    };
  },
  (dispatch) => {
    return {
      actions: {
        resetTape: () => dispatch(resetTape()),
        addTape: data => dispatch(addTape(data)),
        resetConsole: () => dispatch(resetConsole())
      }
    };
  }
)(JavaScriptPage));
