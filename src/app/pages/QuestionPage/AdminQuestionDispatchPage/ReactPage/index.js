import React, { Component } from 'react';
import 'brace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import { Spin } from 'antd';

import { transform } from '@babel/standalone';
import Grid from 'app/components/Grid';
import GridItem from 'app/components/Grid/GridItem';
import CodeWidget from 'app/components/Widgets/CodeWidget';
import ResultWidget from 'app/components/Widgets/ResultWidget';
import AnswerWidget from 'app/components/Widgets/AnswerWidget';

import { listQuestions, getQuestion } from 'app/utils/question';
import debouncedRunCode from 'app/utils/runCode';
import { subscribeOnUpdateRecord } from 'app/utils/record';

import ControlWidget from '../ControlWidget';
import TagWidget from '../../TagWidget';
import styles from './ReactPage.module.scss';

class ReactPage extends Component {
  controlHeight = 70;

  async componentDidMount() {
    const { compiledCode, addTape } = this.props;
    debouncedRunCode({ code: compiledCode, onTapeUpdate: addTape });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode, addTape } = this.props;
    const { compiledCode } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      debouncedRunCode({ code: compiledCode, onTapeUpdate: addTape });
    }
    return true;
  }

  render() {
    const {
      onTagUpdate,
      handleCodeChange,
      test,
      code,
      tags,
      isLoading,
    } = this.props;
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
        key: 'test',
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
        height: (window.innerHeight - this.controlHeight) / 2 - 100,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      },
      {
        key: 'answer',
        x: 1,
        y: 1,
        width: window.innerWidth / 2,
        height: (window.innerHeight - this.controlHeight) / 2 - 100,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      },
      {
        key: 'tag',
        x: 1,
        y: 3,
        width: window.innerWidth / 2,
        height: 200,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      }
    ];
    return (
      <div className={styles.app}>
        <Spin spinning={isLoading} size="large">
          <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
            <GridItem key="code">
              <CodeWidget
                handleCodeChange={handleCodeChange}
                data={code}
                mode="jsx"
                theme="monokai"
              />
            </GridItem>
            <GridItem key="test">
              <CodeWidget
                data={test}
                mode="jsx"
                theme="textmate"
              />
            </GridItem>
            <GridItem key="answer">
              <AnswerWidget />
            </GridItem>
            <GridItem key="result">
              <ResultWidget />
            </GridItem>
            <GridItem key="tag">
              <TagWidget data={tags} onTagUpdate={onTagUpdate} />
            </GridItem>
          </Grid>
        </Spin>
      </div>
    );
  }
}

export default ReactPage;
