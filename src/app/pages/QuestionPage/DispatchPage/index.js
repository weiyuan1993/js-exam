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
  subscribeOnUpdateRecord,
  listRecords
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
    questionContent: '',
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
    recordList: [],
  };

  constructor(props) {
    super(props);
    this.setIntervieweeName = this.setIntervieweeName.bind(this);
    this.getRecordListBySubjectId = this.getRecordListBySubjectId.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.subscribeOnCreateRecord();
    this.subscribeOnUpdateRecord();
    const result = await listQuestions('javascript');
    if (result) {
      this.setState({ questionList: result.items, isLoading: false });
      this.onChangeQuestion(0);
    }

    debouncedRunCode({
      code: this.state.compiledCode,
      onTapeUpdate: this.addTape
    });
  }

  setIntervieweeName = name => {
    this.setState({ intervieweeName: name });
    message.success(name);
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
    this.setState({ isLoading: true, questionIndex: index });
    const result = await getQuestion(id);
    const { tags, content: code, test } = result;
    this.setState({
      questionName: name,
      questionContent: code,
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
      this.setState({ code: newCode });
    }
  };

  onDispatchQuestion = async () => {
    const { questionName, type, questionContent, test, intervieweeName } = this.state;
    this.setState({ isLoading: true });
    try {
      if (intervieweeName === '') {
        message.warning('Please Enter Interviewee First.');
        this.setState({ isLoading: false });
      } else {
        const question = {
          name: questionName,
          type,
          content: questionContent,
          test,
        };
        await dispatchQuestion(question);
        this.createRecord(intervieweeName, question.content);
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

  createRecord = async (intervieweeName, questionContent) => {
    const result = await createRecord(intervieweeName, questionContent);
    this.setState({
      recordId: result.id,
    });
  };

  subscribeOnCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { id } = data;
      this.setState({ recordId: id });
    });
  };

  subscribeOnUpdateRecord = () => {
    subscribeOnUpdateRecord(data => {
      const { id, syncCode, subjectId } = data;
      const { recordId, intervieweeName } = this.state;
      if (id === recordId && intervieweeName === subjectId) {
        this.setState({ code: syncCode });
      }
    });
  };

  getRecordListBySubjectId = async intervieweeName => {
    const result = await listRecords(intervieweeName);
    this.setState({ recordList: result.sort((a, b) => b.timeBegin - a.timeBegin) });
  }

  joinExam = record => {
    const { recordId, recordSyncCode } = record;
    this.setState({
      recordId,
      recordList: []
    });
    this.handleCodeChange(recordSyncCode);
    this.setIntervieweeModal();
  }

  render() {
    const {
      categoryIndex,
      questionIndex,
      questionList,
      recordId,
      intervieweeName,
      visibleIntervieweeModal,
      recordList,
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
      setIntervieweeModal,
      getRecordListBySubjectId,
      joinExam
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
          setIntervieweeModal={setIntervieweeModal}
          intervieweeName={intervieweeName}
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
          getRecordListBySubjectId={getRecordListBySubjectId}
          visible={visibleIntervieweeModal}
          searchable
          recordList={recordList}
          joinExam={joinExam}
        />
      </React.Fragment>
    );
  }
}

export default Page;
