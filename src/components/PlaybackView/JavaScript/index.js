import React, { Component } from 'react';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import { Spin } from 'antd';

import Grid from 'components/Grid';
import GridItem from 'components/Grid/GridItem';
import CodeWidget from 'components/Widgets/CodeWidget';
import TestWidget from 'components/Widgets/TestWidget';
import TapeWidget from 'components/Widgets/TapeWidget';

import debouncedRunCode from 'utils/runCode';
import { JAVASCRIPT as GRID_LABEL_JAVASCRIPT } from 'utils/gridLabel';

import styles from './JavaScriptPage.module.scss';
import CommentArea from '../Comment';

class JavaScriptPage extends Component {
  componentDidMount() {
    const { compiledCode, addTape } = this.props;
    debouncedRunCode({ code: compiledCode, onTapeUpdate: addTape });
  }

  shouldComponentUpdate(nextProps) {
    const {
      compiledCode: previousCompiledCode,
      addTape,
      resetTape,
    } = this.props;
    const { compiledCode } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      resetTape();
      debouncedRunCode({ code: compiledCode, onTapeUpdate: addTape });
    }
    return true;
  }

  render() {
    const { handleCodeChange, code, test, tape, isLoading, comments } = this.props;
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
        maxHeight: 500,
      },
      {
        key: 'test',
        x: 0,
        y: 1,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        maxWidth: 700,
      },
      {
        key: 'tape',
        x: 1,
        y: 0,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
      {
        key: 'comment',
        x: 1,
        y: 1,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500,
      },
    ];
    return (
      <div className={styles.app}>
        <Spin spinning={isLoading} size="large">
          <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
            <GridItem key="code" label={GRID_LABEL_JAVASCRIPT.code}>
              <CodeWidget
                handleCodeChange={handleCodeChange}
                data={code}
                mode="javascript"
                theme="monokai"
                readOnly
              />
            </GridItem>
            <GridItem key="test" label={GRID_LABEL_JAVASCRIPT.test}>
              <TestWidget data={test} readOnly />
            </GridItem>
            <GridItem key="tape" label={GRID_LABEL_JAVASCRIPT.tape}>
              <TapeWidget data={tape} />
            </GridItem>
            <GridItem key="comment" label="comment">
              <CommentArea comments={comments} />
            </GridItem>
          </Grid>
        </Spin>
      </div>
    );
  }
}

export default JavaScriptPage;
