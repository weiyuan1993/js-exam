import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { transform } from '@babel/standalone';
import { message } from 'antd';

import {
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId
} from 'app/utils/record';

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
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    questionList: [],
    questionIndex: 0,
    isLoading: false
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
    // when question has dispatched, append the record data
    if (this.props.record.id) {
      this.subscribeRecordUpdate();
      const { ques, syncCode } = this.props.record;
      if (ques) {
        const { type, name, content, test } = ques;
        this.setState({
          questionName: name,
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

    this.subscribeCreateRecord();
  };

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    await this.props.actions.fetchQuestionList(
      index === 0 ? 'javascript' : 'react'
    );
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async index => {
    const { id, type } = this.props.question.list[index];
    this.setState({ isLoading: true, questionIndex: index });
    await this.props.actions.fetchQuestion(id);
    const { name, tags, content, test } = this.props.question;
    this.setState({
      questionName: name,
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
    const { questionName, type, code, test } = this.state;
    const { room } = this.props;
    this.setState({ isLoading: true });
    try {
      // unsubscribe the old record
      this.subscriptionForUpdateRecordByRecordId.unsubscribe();
      const question = {
        name: questionName,
        type,
        content: code,
        test
      };
      await this.props.actions.createRecordData({
        subjectId: room.subjectId,
        roomId: room.id,
        question
      });
      // re-subscribe the new record
      this.subscribeRecordUpdate();
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

  subscribeCreateRecord = () => {
    this.subscriptionForCreateRecord = subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room.id === this.props.room.id) {
        // unsubscribe the old record
        if (this.subscriptionForUpdateRecordByRecordId) {
          this.subscriptionForUpdateRecordByRecordId.unsubscribe();
        }
        this.props.actions.setCurrentRecord(data);
        // to receive new question dispatched
        this.setState({
          questionName: ques.name,
          code: ques.content,
          test: ques.test
        });
        console.log('##onCreateRecord', data);

        this.subscribeRecordUpdate();
      }
    });
  };

  subscribeRecordUpdate = () => {
    this.subscriptionForUpdateRecordByRecordId = subscribeOnUpdateRecordByRecordId(
      this.props.record.id,
      data => {
        const { room, syncCode } = data;
        if (room.id === this.props.room.id) {
          this.props.actions.setCurrentRecord(data);
          this.setState({
            code: syncCode || this.props.record.ques.content
          });
          console.log('#onRecordUpdate', data);
        }
      }
    );
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
              roomDescription={room.description}
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
