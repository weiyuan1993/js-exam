import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { transform } from '@babel/standalone';
import { message } from 'antd';

import { subscribeOnCreateRecord, subscribeOnUpdateRecord } from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import ControlWidget from './ControlWidget';

import { getRoomInfo } from 'app/actions/room';
import { fetchQuestionList, fetchQuestion } from 'app/actions/question';
import { createRecordData, setCurrentRecord } from 'app/actions/record';

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
    categoryIndex: 0,
    questionName: '',
    questionContent: '',
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    questionList: [],
    questionIndex: 0,
    isLoading: false,
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
    if (this.props.record.id) {
      console.log("has record",this.props)
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

    this.subscribeOnCreateRecord();
    this.subscribeOnUpdateRecord();
  };

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    await this.props.actions.fetchQuestionList(
      index === 0 ? 'javascript' : 'react'
    );
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
    const { questionName, type, questionContent, test } = this.state;
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

  subscribeOnCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room.id === this.props.room.id) {
        this.props.actions.setCurrentRecord(data);
        this.setState({
          questionName: ques.name,
          questionContent: ques.content,
          code: ques.content,
          test: ques.test
        });
      }
    });
  };

  subscribeOnUpdateRecord = () => {
    subscribeOnUpdateRecord(data => {
      const { room, syncCode } = data;
      if (room.id === this.props.room.id) {
        this.props.actions.setCurrentRecord(data);
        this.setState({
          code: syncCode || this.props.record.ques.content
        });
      }
    });
  };

  render() {
    const { categoryIndex, questionIndex } = this.state;
    const {
      onChangeCategory,
      onChangeQuestion,
      onDispatchQuestion,
      handleCodeChange,
      addTape,
      resetTape,
      onTagUpdate,
      setIntervieweeModal
    } = this;
    const { room, question } = this.props;
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
          getRoomInfo: id => dispatch(getRoomInfo(id)),
          fetchQuestionList: type => dispatch(fetchQuestionList(type)),
          fetchQuestion: id => dispatch(fetchQuestion(id)),
          createRecordData: ({ subjectId, roomId, question }) => dispatch(createRecordData({ subjectId, roomId, question })),
          setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData))
        }
      };
    }
  )(Page)
);
