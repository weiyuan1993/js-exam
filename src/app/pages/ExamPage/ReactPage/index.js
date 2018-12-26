import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import 'brace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import Grid from 'app/components/Grid';
import GridItem from 'app/components/Grid/GridItem';
import ConsoleWidget from 'app/components/Widgets/ConsoleWidget';
import CodeWidget from 'app/components/Widgets/CodeWidget';
import ResultWidget from 'app/components/Widgets/ResultWidget';
import AnswerWidget from 'app/components/Widgets/AnswerWidget';

import debouncedRunCode from 'app/utils/runCode';

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
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      },
      {
        key: 'answer',
        x: 0,
        y: 1,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        maxWidth: 700
      },
      {
        key: 'result',
        x: 1,
        y: 0,
        width: window.innerWidth / 2,
        height: (window.innerHeight - this.controlHeight) / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      },
      {
        key: 'console',
        x: 1,
        y: 1,
        width: window.innerWidth / 2,
        height: (window.innerHeight - this.controlHeight) / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      }
    ];
    return (
      <div className={styles.app}>
        <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
          <GridItem key="code">
            <CodeWidget
              handleCodeChange={handleCodeChange}
              data={code}
              mode="jsx"
              theme="monokai"
            />
          </GridItem>
          <GridItem key="answer">
            <AnswerWidget />
          </GridItem>
          <GridItem key="result">
            <ResultWidget />
          </GridItem>
          <GridItem key="console">
            <ConsoleWidget data={_console} />
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withRouter(ReactPage);
