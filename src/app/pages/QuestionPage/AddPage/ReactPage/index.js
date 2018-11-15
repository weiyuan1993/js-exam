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

import debouncedRunCode from 'app/utils/runCode';

import ControlWidget from '../ControlWidget';
import TagWidget from '../../TagWidget';
import styles from './ReactPage.module.scss';


class ReactPage extends Component {
  constructor(props) {
    super(props);
    this.controlHeight = 70;
    this.state = {
      code: '',
      compiledCode: '',
      test: '',
      name: '',
      tags: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const { compiledCode } = this.state;
    debouncedRunCode({ code: compiledCode });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { compiledCode: previousCompiledCode } = this.state;
    const { compiledCode } = nextState;
    if (previousCompiledCode !== compiledCode) {
      // this.setState({ tape: [] }, () => {
      debouncedRunCode({ code: compiledCode });
      // });
    }
    return true;
  }

  onCodeChange = () => {
    const { code, test } = this.state;
    const fullCode = `${code} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: ['es2015', ['stage-2', { decoratorsBeforeExport: true }], 'react'],
        plugins: ['proposal-object-rest-spread']
      });
      this.setState({ compiledCode });
    } catch (e) {
      console.log(e);
    }
  }

  onTagUpdate = (tags) => {
    this.setState({ tags });
  }

  onSubmit = async () => {
    const {
      tags,
      name,
      code,
      test
    } = this.state;
    const { onSubmit } = this.props;
    this.setState({ isLoading: true });
    await onSubmit({
      tags,
      name,
      code,
      test,
      type: 'react'
    });
    this.setState({ isLoading: false });
  }

  render() {
    const {
      test,
      code,
      tags,
      isLoading
    } = this.state;
    const { onChangeCategory, index } = this.props;
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
        key: 'result', x: 1, y: 1, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2 - 100, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'answer', x: 1, y: 2, width: window.innerWidth / 2, height: (window.innerHeight - this.controlHeight) / 2 - 100, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
      {
        key: 'tag', x: 1, y: 3, width: window.innerWidth / 2, height: 200, minWidth: 100, minHeight: 100, maxWidth: 700, maxHeight: 500
      },
    ];
    return (
      <div className={styles.app}>     
        <Spin spinning={isLoading} size="large">
          <Grid layout={layout} totalWidth="100%" totalHeight="100%" autoResize>
            <GridItem key="code">
              <CodeWidget
                handleCodeChange={(newCode) => {
                  this.setState({ code: newCode }, this.onCodeChange);
                }}
                data={code}
                mode="jsx"
                theme="monokai"
              />
            </GridItem>
            <GridItem key="test">
              <CodeWidget
                handleCodeChange={(newCode) => {
                  this.setState({ test: newCode }, this.onCodeChange);
                }}
                data={test}
                mode="jsx"
                theme="textmate"
              />
            </GridItem>
            <GridItem key="answer">
              <AnswerWidget />
            </GridItem>
            <GridItem key="control">
              <ControlWidget
                onChangeName={(name) => { this.setState({ name })}}
                onSubmit={this.onSubmit}
                type="react"
                onChangeCategory={onChangeCategory}
                index={index}
              />
            </GridItem>
            <GridItem key="result">
              <ResultWidget />
            </GridItem>
            <GridItem key="tag">
              <TagWidget data={tags} onTagUpdate={this.onTagUpdate} />
            </GridItem>
          </Grid>
        </Spin>
      </div>
    );
  }
}

export default ReactPage;
