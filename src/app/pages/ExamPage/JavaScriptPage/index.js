import React, { Component } from 'react';
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
import ControlWidget from '../ControlWidget';

import debouncedRunCode from 'app/utils/runCode';

import styles from './JavaScriptPage.module.scss';

class JavaScriptPage extends Component {
  constructor(props) {
    super(props);
    this.controlHeight = 70;
  }

  componentDidMount() {
    const { compiledCode, wrappedConsole, resetConsole, addTape } = this.props;
    resetConsole();
    debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: addTape });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode, resetConsole, addTape, resetTape } = this.props;
    const { compiledCode, wrappedConsole } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      resetConsole();
      resetTape();
      debouncedRunCode({ code: compiledCode, wrappedConsole, onTapeUpdate: addTape });
    }
    return true;
  }

  render() {
    const {
      code,
      test,
      handleCodeChange,
      tape,
      console: _console,
      onReset,
    } = this.props;
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
            <ControlWidget
              onReset={() => onReset('javascript')}
            />
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

export default withRouter(JavaScriptPage);
