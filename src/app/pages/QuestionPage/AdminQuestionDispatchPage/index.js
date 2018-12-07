import React, { Component } from 'react';
import { transform } from '@babel/standalone';

import { listQuestions, getQuestion, dispatchQuestion } from 'app/utils/question';
import debouncedRunCode from 'app/utils/runCode';

import {
  createRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

import { message } from 'antd';

const getPageComponent = args => {
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
    recordId: '',
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    id: null,
    questionList: [],
    questionIndex: 0,
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const result = await listQuestions('javascript');
    this.setState({ questionList: result.items, isLoading: false });
    this.onChangeQuestion(0);
    this.subscribeOnCreateRecord();
    this.subscribeOnUpdateRecord();
    debouncedRunCode({ code: this.state.compiledCode, onTapeUpdate: this.addTape });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { compiledCode: previousCompiledCode } = this.state;
    const { compiledCode } = nextState;
    if (previousCompiledCode !== compiledCode) {
      this.resetTape();
      debouncedRunCode({ code: compiledCode, onTapeUpdate: this.addTape });
    }
    return true;
  }

  onChangeCategory = index => {
    this.setState({ category: index });
  };

  onChangeQuestion = async index => {
    console.log(index)
    const { questionList } = this.state;
    const { id, name, type } = questionList[index];
    this.setState({ isLoading: true, index });
    const result = await getQuestion({ id });
    const { tags, content: code, test } = result.data.getQuestion;
    this.setState({
      name,
      type,
      tags,
      code,
      test,
      isLoading: false,
      id
    });
  };

  onCodeChange = () => {
    const { code, test } = this.state;
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
      console.log(e);
    }
  };

  onDispatchQuestion = async () => {
    const { name, type, code, test } = this.state;
    this.setState({ isLoading: true });
    try {
      const result = await dispatchQuestion({ name, type, content: code, test });
      this.createRecord();
      message.success(`Dispatching the question "${result.name}" successfully!`);
      this.setState({ isLoading: false });
    } catch (e) {
      message.error(e.message, 2);
      this.setState({ isLoading: false });
    }
  };

  addTape = data => {
    const { tape } = this.state;
    this.setState({
      tape: [...tape, data]
    });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  onTagUpdate = tags => {
    this.setState({ tags });
  };

  createRecord = async () => {
    const result = await createRecord();
    this.setState({ recordId: result.id });
  };

  subscribeOnCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { id } = data;
      this.setState({ recordId: id });
    });
  };

  subscribeOnUpdateRecord = () => {
    subscribeOnUpdateRecord(data => {
      const { id, history } = data;
      const { recordId } = this.state;
      if (id === recordId) {
        console.log(data);
        this.setState({ code: history[0] });
      }
    });
  };


  render() {
    const { category, recordId } = this.state;
    const {
      onChangeQuestion,
      handleCodeChange,
      addTape,
      resetTape,
      onTagUpdate
    } = this;
    return (
      <React.Fragment>
        {getPageComponent({
          categoryIndex: category,
          recordId,
          onDispatchQuestion: this.onDispatchQuestion,
          onChangeCategory: this.onChangeCategory,
          onChangeQuestion,
          handleCodeChange,
          addTape,
          resetTape,
          onTagUpdate,
          ...this.state
        })}
      </React.Fragment>
    );
  }
}

export default Page;
