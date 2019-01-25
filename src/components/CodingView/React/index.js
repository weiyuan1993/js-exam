import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'brace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import Grid from 'components/Grid';
import GridItem from 'components/Grid/GridItem';
import ConsoleWidget from 'components/Widgets/ConsoleWidget';
import CodeWidget from 'components/Widgets/CodeWidget';
import ResultWidget from 'components/Widgets/ResultWidget';
import AnswerWidget from 'components/Widgets/AnswerWidget';

import debouncedRunCode from 'utils/runCode';
import { REACT as GRID_LABEL_REACT } from 'utils/gridLabel';

import styles from './ReactPage.module.scss';

class ReactPage extends Component {
  constructor(props) {
    super(props);
    this.controlHeight = 70;
  }

  componentDidMount() {
    const { compiledCode, wrappedConsole, resetConsole } = this.props;
    resetConsole();
    debouncedRunCode({ code: compiledCode, wrappedConsole });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode } = this.props;
    const { compiledCode, wrappedConsole, resetConsole } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      resetConsole();
      debouncedRunCode({ code: compiledCode, wrappedConsole });
    }
    return true;
  }

  render() {
    const { code, handleCodeChange, console: _console } = this.props;
    const layout = [
      {
        key: 'code',
        x: 0,
        y: 0,
        width: window.innerWidth / 2 + 50,
        height: window.innerHeight / 2 + 100,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
      {
        key: 'answer',
        x: 0,
        y: 1,
        width: window.innerWidth / 2 + 50,
        height: window.innerHeight / 2 - 150,
        minWidth: 100,
        maxWidth: 700,
      },
      {
        key: 'result',
        x: 1,
        y: 0,
        width: window.innerWidth / 2 - 50,
        height: (window.innerHeight - this.controlHeight) / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
      {
        key: 'console',
        x: 1,
        y: 1,
        width: window.innerWidth / 2 - 50,
        height: (window.innerHeight - this.controlHeight) / 2 - 50,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
    ];
    return (
      <div className={styles.app}>
        <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
          <GridItem key="code" label={GRID_LABEL_REACT.code}>
            <CodeWidget
              handleCodeChange={handleCodeChange}
              data={code}
              mode="jsx"
              theme="monokai"
            />
          </GridItem>
          <GridItem key="answer" label={GRID_LABEL_REACT.answer}>
            <AnswerWidget />
          </GridItem>
          <GridItem key="result" label={GRID_LABEL_REACT.result}>
            <ResultWidget />
          </GridItem>
          <GridItem key="console" label={GRID_LABEL_REACT.console}>
            <ConsoleWidget data={_console} />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withRouter(ReactPage);
