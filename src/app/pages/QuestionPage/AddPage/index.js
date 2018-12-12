import React, { Component } from 'react';

import { transform } from '@babel/standalone';

import { message } from 'antd';

import { createQuestion } from 'app/utils/question';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

import ControlWidget from './ControlWidget';

const getPageComponent = (args) => {
  switch (args.index) {
    case 1: {
      return <ReactPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class Page extends Component {
  state = {
    category: 0,
    name: '',
    tags: [],
    code: '',
    compiledCode: '',
    test: '',
    isLoading: false
  }


  onChangeCategory = (index) => {
    this.setState({ category: index });
  }

  onSubmit = async () => {
    const {
      tags,
      name,
      code,
      test
    } = this.state;
    this.setState({ isLoading: true });
    try {
      await createQuestion({
        tags,
        name,
        code,
        test,
        type: 'javascript'
      });
      message.success(`Successfully add the question "${name}"!`);
    } catch (e) {
      message.error(e);
    }
    this.setState({ isLoading: false });
  }

  compileCode = () => {
    const { test, code } = this.state;

    const fullCode = `${code} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react'
        ],
        plugins: ['proposal-object-rest-spread']
      });
      this.setState({ compiledCode });
    } catch (e) {
      console.log('Compile code error!');
    }
  };

  handleCodeChange = (newCode) => {
    this.setState({ code: newCode }, this.compileCode);
  }

  handleTestChange = (newTest) => {
    this.setState({ test: newTest }, this.compileCode);
  }

  onTagUpdate = tags => {
    this.setState({ tags });
  };

  render() {
    const { category } = this.state;
    return (
      <React.Fragment>
        <ControlWidget
          type="javascript"
          onChangeName={(name) => this.setState({ name })}
          onSubmit={this.onSubmit}
          onChangeCategory={this.onChangeCategory}
          index={category}
        />
        { getPageComponent({
          index: category,
          onSubmit: this.onSubmit,
          onChangeCategory: this.onChangeCategory,
          handleCodeChange: this.handleCodeChange,
          handleTestChange: this.handleTestChange,
          onTagUpdate: this.onTagUpdate,
          ...this.state
        }) }
      </React.Fragment>
    );
  }
}

export default Page;
