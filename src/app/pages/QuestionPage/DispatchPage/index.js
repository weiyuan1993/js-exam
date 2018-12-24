import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { transform } from '@babel/standalone';
import { message, notification } from 'antd';

import {
  listQuestions,
  getQuestion,
  dispatchQuestion
} from 'app/utils/question';
import debouncedRunCode from 'app/utils/runCode';

import {
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord,
  listRecords
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import ControlWidget from './ControlWidget';
import UserModal from 'app/components/Modal';

import changeTab from 'app/actions/tab';
import { getRoomInfo } from 'app/actions/room';
import { fetchQuestionList, fetchQuestion } from 'app/actions/question';
import { createRecordData } from 'app/actions/record';

const MainView = args => {
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
    roomDescription: '',
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
    intervieweeName: 'Vic',
    visibleIntervieweeModal: true,
    recordList: [],
    isHost: false
  };

  async componentDidMount() {
    await this.getRoom(this.props.match.params.roomId);
    console.log('DidMount', this.props);
  }

  // for observer
  getRoom = async id => {
    this.setState({ isLoading: true });
    await this.props.actions.getRoomInfo(id);
    await this.setRoomSetting();
    this.setState({ isLoading: false });
  };

  setRoomSetting = async () => {
    await this.props.actions.fetchQuestionList(
      this.state.categoryIndex === 0 ? 'javascript' : 'react'
    );
    // when question has dispatched
    if (this.props.record) {
      const { ques, syncCode } = this.props.record;
      if (ques) {
        const { type, name, content, test } = ques;
        this.setState({
          questionName: name,
          questionContent: content,
          type,
          code: syncCode || content,
          test
        });
      } else {
        await this.onChangeQuestion(0);
      }
    } else {
      await this.onChangeQuestion(0);
    }

    // this.subscribeOnCreateRecord();
    // this.subscribeOnUpdateRecord();
    // this.subscribeOnUpdateRoom();
  };

  setIntervieweeName = name => {
    this.setState({ intervieweeName: name });
    message.success(name);
  };

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    const result = await listQuestions(index === 0 ? 'javascript' : 'react');
    this.setState({ questionList: result.items, isLoading: false });
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async index => {
    const { id, name, type } = this.props.question.list[index];
    this.setState({ isLoading: true, questionIndex: index });
    await this.props.actions.fetchQuestion(id);
    const { tags, content, test } = this.props.question;

    this.setState({
      questionName: name,
      questionContent: content,
      type,
      tags,
      code: content,
      test,
      isLoading: false
    });
    this.setState({ isLoading: false });
  };

  handleCodeChange = newCode => {
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
    const {
      questionName,
      type,
      questionContent,
      test
    } = this.state;
    const { subjectId, room } = this.props;
    this.setState({ isLoading: true });
    try {
      const question = {
        name: questionName,
        type,
        content: questionContent,
        test
      };
      await this.props.actions.createRecordData({
        subjectId,
        roomId: room.id,
        question
      });
      this.setState({ isLoading: false });
    } catch (e) {
      message.error(e.errors[0].message, 2);
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

  // getRecordListBySubjectId = async intervieweeName => {
  //   const result = await listRecords(intervieweeName);
  //   this.setState({
  //     recordList: result.sort((a, b) => b.timeBegin - a.timeBegin)
  //   });
  // };

  // joinExam = record => {
  //   const { recordId, recordSyncCode } = record;
  //   this.setState({
  //     recordId,
  //     recordList: []
  //   });
  //   this.handleCodeChange(recordSyncCode);
  //   this.setIntervieweeModal();
  // };

  // subscribeOnUpdateRoom = () => {
  //   subscribeOnUpdateRoom(data => {
  //     console.log(data);
  //   });
  // };

  render() {
    const {
      roomDescription,
      categoryIndex,
      questionIndex,
      recordId,
      intervieweeName,
      visibleIntervieweeModal,
      recordList
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
    const { room, record, question } = this.props;
    return (
      <React.Fragment>
        {!room.loading && room.description ? (
          <>
            <ControlWidget
              onDispatchQuestion={onDispatchQuestion}
              onChangeCategory={onChangeCategory}
              categoryIndex={categoryIndex}
              questionIndex={questionIndex}
              questionList={question.list}
              onChangeQuestion={onChangeQuestion}
              setIntervieweeModal={setIntervieweeModal}
              intervieweeName={room.subjectId}
            />
            <MainView
              onDispatchQuestion={onDispatchQuestion}
              onChangeCategory={onChangeCategory}
              onChangeQuestion={onChangeQuestion}
              handleCodeChange={handleCodeChange}
              addTape={addTape}
              resetTape={resetTape}
              onTagUpdate={onTagUpdate}
              {...this.state}
            />
            {/* <UserModal
            setIntervieweeModal={setIntervieweeModal}
            mustEnterName={false}
            closable
            setIntervieweeName={setIntervieweeName}
            getRecordListBySubjectId={getRecordListBySubjectId}
            visible={visibleIntervieweeModal}
            searchable
            recordList={recordList}
            joinExam={joinExam}
          /> */}
          </>
        ) : (
          <span>{room.error ? <>Not Found</> : <>Loading...</>}</span>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => {
      return {
        room: state.room,
        record: state.record,
        code: state.code,
        question: state.question
      };
    },
    dispatch => {
      return {
        actions: {
          changeTab: key => dispatch(changeTab(key)),
          getRoomInfo: id => dispatch(getRoomInfo(id)),
          fetchQuestionList: type => dispatch(fetchQuestionList(type)),
          fetchQuestion: id => dispatch(fetchQuestion(id)),
          createRecordData: ({ subjectId, roomId, question }) => dispatch(createRecordData({ subjectId, roomId, question }))
        }
      };
    }
  )(Page)
);
