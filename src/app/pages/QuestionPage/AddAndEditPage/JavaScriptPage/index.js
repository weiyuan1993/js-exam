import React, { Component } from 'react';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';

import { Spin } from 'antd';

import Grid from 'app/components/Grid';
import GridItem from 'app/components/Grid/GridItem';
import CodeWidget from 'app/components/Widgets/CodeWidget';
import TestWidget from 'app/components/Widgets/TestWidget';
import TapeWidget from 'app/components/Widgets/TapeWidget';

import debouncedRunCode from 'app/utils/runCode';

import TagWidget from '../../TagWidget';
import styles from './JavaScriptPage.module.scss';

class JavaScriptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tape: []
    };
  }

  componentDidMount() {
    const { compiledCode } = this.props;
    debouncedRunCode({ code: compiledCode, onTapeUpdate: this.addTape });
  }

  shouldComponentUpdate(nextProps) {
    const { compiledCode: previousCompiledCode } = this.props;
    const { compiledCode } = nextProps;
    if (previousCompiledCode !== compiledCode) {
      this.setState({ tape: [] }, () => {
        debouncedRunCode({ code: compiledCode, onTapeUpdate: this.addTape });
      });
    }
    return true;
  }

  addTape = data => {
    const { tape } = this.state;
    this.setState({
      tape: [...tape, data]
    });
  };

  render() {
    const { tape } = this.state;
    const {
      isLoading,
      test,
      code,
      tags,
      onTagUpdate,
      handleCodeChange,
      handleTestChange } = this.props;
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
        key: 'tape',
        x: 1,
        y: 0,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 700,
        maxHeight: 500
      },
      {
        key: 'tag',
        x: 1,
        y: 1,
        width: window.innerWidth / 2,
        height: window.innerHeight / 2,
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
                mode="javascript"
                theme="monokai"
              />
            </GridItem>
            <GridItem key="test">
              <TestWidget
                handleCodeChange={handleTestChange}
                data={test}
                readOnly={false}
              />
            </GridItem>
            <GridItem key="tape">
              <TapeWidget data={tape} />
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

export default JavaScriptPage;
