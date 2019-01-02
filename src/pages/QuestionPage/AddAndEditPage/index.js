import React, { Component } from 'react';

import { transform } from '@babel/standalone';

import { message } from 'antd';

import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  listQuestions,
  getQuestion,
} from 'utils/question';
import debouncedRunCode from 'utils/runCode';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

import ControlWidget from './ControlWidget';

const getPageComponent = args => {
  switch (args.categoryIndex) {
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
    categoryIndex: 0,
    name: '',
    tags: [],
    code: '',
    compiledCode: '',
    test: '',
    id: null,
    questionList: [],
    questionIndex: 0,
    isLoading: false,
  };

  async componentDidMount() {
    if (this.props.type === 'edit') {
      const { compiledCode } = this.state;
      this.setState({ isLoading: true });
      this.getQuestionList();
      debouncedRunCode({ code: compiledCode, onTapeUpdate: this.addTape });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentTab !== this.props.currentTab) {
      if (nextProps.currentTab === 'edit') {
        const { compiledCode } = this.state;
        this.setState({ isLoading: true });
        this.getQuestionList();
        debouncedRunCode({ code: compiledCode, onTapeUpdate: this.addTape });
      } else {
        this.setState({
          name: '',
          tags: [],
          code: '',
          compiledCode: '',
          test: '',
          id: null,
        });
      }
    }
    return true;
  }

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index }, await this.getQuestionList);
  };

  getQuestionList = async () => {
    const { categoryIndex } = this.state;
    const result = await listQuestions(
      categoryIndex === 0 ? 'javascript' : 'react',
    );
    this.setState({ questionList: result.items, isLoading: false });
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async questionIndex => {
    const { questionList } = this.state;
    const { id } = questionList[questionIndex];
    this.setState({ isLoading: true, questionIndex });
    const result = await getQuestion(id);
    const { tags, content: code, test } = result;
    this.setState({
      tags,
      code,
      test,
      isLoading: false,
      id,
    });
  };

  onSubmit = async () => {
    const { categoryIndex, tags, name, code: content, test, id } = this.state;
    this.setState({ isLoading: true });
    if (this.props.type === 'add') {
      await this.onCreateQuestion({
        tags,
        name,
        content,
        test,
        type: categoryIndex === 0 ? 'javascript' : 'react',
      });
    } else {
      await this.onUpdateQuestion({
        id,
        tags,
        content,
        test,
      });
    }
    this.setState({ isLoading: false });
  };

  onCreateQuestion = async data => {
    try {
      await createQuestion(data);
      message.success(`Successfully add the question "${data.name}"!`, 0.5);
    } catch (e) {
      message.error(e.errors[0].message);
    }
  };

  onUpdateQuestion = async data => {
    try {
      await updateQuestion(data);
      message.success('Successfully edited!', 0.5);
    } catch (e) {
      message.error(e);
    }
  };

  onDelete = async () => {
    const { id } = this.state;
    this.setState({ isLoading: true });
    try {
      await deleteQuestion({
        input: {
          id,
        },
      });
      message.success('Successfully deleted!');
    } catch (e) {
      message.error(e);
    }
    await this.getQuestionList();
    this.setState({ isLoading: false });
  };

  compileCode = () => {
    const { test, code } = this.state;
    const fullCode = `${code} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.setState({ compiledCode });
    } catch (e) {
      console.log('Compile code error!');
    }
  };

  handleCodeChange = newCode => {
    this.setState({ code: newCode }, this.compileCode);
  };

  handleTestChange = newTest => {
    this.setState({ test: newTest }, this.compileCode);
  };

  onTagUpdate = tags => {
    this.setState({ tags });
  };

  onSync = async () => {
    const { categoryIndex } = this.state;
    this.setState({ isLoading: true });
    const result = await listQuestions(
      categoryIndex === 0 ? 'javascript' : 'react',
    );
    this.setState({ questionList: result.items, isLoading: false });
  };

  render() {
    const {
      categoryIndex,
      name,
      code,
      test,
      questionIndex,
      questionList,
    } = this.state;
    return (
      <React.Fragment>
        <ControlWidget
          type={this.props.type}
          onChangeName={questionName => this.setState({ name: questionName })}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          onChangeCategory={this.onChangeCategory}
          onChangeQuestion={this.onChangeQuestion}
          onSync={this.onSync}
          categoryIndex={categoryIndex}
          questionIndex={questionIndex}
          questionList={questionList}
          disableSubmit={!name || !code || !test}
        />
        {getPageComponent({
          categoryIndex,
          onSubmit: this.onSubmit,
          onChangeCategory: this.onChangeCategory,
          handleCodeChange: this.handleCodeChange,
          handleTestChange: this.handleTestChange,
          onTagUpdate: this.onTagUpdate,
          ...this.state,
        })}
      </React.Fragment>
    );
  }
}

export default Page;
