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

import TagWidget from '../TagWidget';
import styles from './JavaScriptPage.module.scss';

class JavaScriptPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tape: [],
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
      tape: [...tape, data],
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
      handleTestChange,
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
        key: 'tag',
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
              />
            </GridItem>
            <GridItem key="test" label={GRID_LABEL_JAVASCRIPT.test}>
              <TestWidget
                handleCodeChange={handleTestChange}
                data={test}
                readOnly={false}
              />
            </GridItem>
            <GridItem key="tape" label={GRID_LABEL_JAVASCRIPT.tape}>
              <TapeWidget data={tape} />
            </GridItem>
            <GridItem key="tag" label={GRID_LABEL_JAVASCRIPT.tag}>
              <TagWidget data={tags} onTagUpdate={onTagUpdate} />
            </GridItem>
          </Grid>
        </Spin>
      </div>
    );
  }
}

export default JavaScriptPage;
