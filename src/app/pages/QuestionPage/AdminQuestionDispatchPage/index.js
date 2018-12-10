import React, { Component } from 'react';
import { transform } from '@babel/standalone';
import { message } from 'antd';

import {
  listQuestions,
  getQuestion,
  dispatchQuestion
} from 'app/utils/question';
import debouncedRunCode from 'app/utils/runCode';

import {
  createRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import ControlWidget from './ControlWidget';
import UserModal from 'app/components/Modal';

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
    recordId: '',
    questionName: '',
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    id: null,
    questionList: [],
    questionIndex: 0,
    isLoading: false,
    intervieweeName: '',
    visibleIntervieweeModal: true,
  };

  constructor(props) {
    super(props);
    this.setIntervieweeName = this.setIntervieweeName.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const result = await listQuestions('javascript');
    this.setState({ questionList: result.items, isLoading: false });
    this.onChangeQuestion(0);
    this.subscribeOnCreateRecord();
    this.subscribeOnUpdateRecord();
    debouncedRunCode({
      code: this.state.compiledCode,
      onTapeUpdate: this.addTape
    });
  }

  setIntervieweeName = name => {
    this.setState({ intervieweeName: name });
    message.success(name)
  }

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    const result = await listQuestions(index === 0 ? 'javascript' : 'react');
    this.setState({ questionList: result.items, isLoading: false });
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async index => {
    const { questionList } = this.state;
    const { id, name, type } = questionList[index];
    this.setState({ isLoading: true, index });
    const result = await getQuestion(id);
    const { tags, content: code, test } = result;
    this.setState({
      questionName: name,
      type,
      tags,
      code,
      test,
      isLoading: false,
      id
    });
  };

  handleCodeChange = (newCode) => {
    const { test } = this.state;
    const fullCode = `${newCode} ${test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react'
        ],
        plugins: ['proposal-object-rest-spread']
      });
      this.setState({ code: newCode, compiledCode });
    } catch (e) {
      console.log('Editor code complie error.');
    }
  };

  onDispatchQuestion = async () => {
    const { questionName, type, code, test, intervieweeName } = this.state;
    this.setState({ isLoading: true });
    try {
      if (intervieweeName === '') {
        message.warning('Please Enter Interviewee First.');
        this.setState({ isLoading: false });
      } else {
        await dispatchQuestion({ name: questionName, type, code, test });
        this.createRecord(intervieweeName);
        message.success(
          `Dispatching the question "${questionName}" to "${intervieweeName}" successfully!`
        );
        this.setState({ isLoading: false });
      }
    } catch (e) {
      message.error(e.message, 2);
      this.setState({ isLoading: false });
    }
  };

  addTape = newTape => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  onTagUpdate = tags => {
    this.setState({ tags });
  };

  setIntervieweeModal = () => {
    const { visibleIntervieweeModal } = this.state;
    this.setState({ visibleIntervieweeModal: !visibleIntervieweeModal });
  }

  createRecord = async intervieweeName => {
    const result = await createRecord(intervieweeName);
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
      const { id, history, subjectId } = data;
      const { recordId, intervieweeName } = this.props;
      if (id === recordId && intervieweeName === subjectId) {
        console.log(data);
        this.setState({ code: history[0] });
      }
    });
  };

  render() {
    const {
      categoryIndex,
      questionIndex,
      questionList,
      recordId,
      intervieweeName,
      visibleIntervieweeModal,
    } = this.state;
    const {
      onChangeCategory,
      onChangeQuestion,
      onDispatchQuestion,
      handleCodeChange,
      addTape,
      resetTape,
      onTagUpdate,
      setIntervieweeName,
      setIntervieweeModal
    } = this;
    return (
      <React.Fragment>
        <ControlWidget
          onDispatchQuestion={onDispatchQuestion}
          onChangeCategory={onChangeCategory}
          categoryIndex={categoryIndex}
          questionIndex={questionIndex}
          questionList={questionList}
          onChangeQuestion={onChangeQuestion}
        />
        {getPageComponent({
          categoryIndex,
          recordId,
          intervieweeName,
          onDispatchQuestion,
          onChangeCategory,
          onChangeQuestion,
          handleCodeChange,
          addTape,
          resetTape,
          onTagUpdate,
          ...this.state
        })}
        <UserModal
          setIntervieweeModal={setIntervieweeModal}
          mustEnterName={false}
          closable
          setIntervieweeName={setIntervieweeName}
          visible={visibleIntervieweeModal}
        />
      </React.Fragment>
    );
  }
}

export default Page;
