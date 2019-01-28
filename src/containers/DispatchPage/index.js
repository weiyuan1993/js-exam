import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { transform } from '@babel/standalone';
import { Spin, Empty, message } from 'antd';

import {
  subscribeOnCreateRecord,
  subscribeOnUpdateRecordByRecordId,
} from 'utils/record';
import createComment from 'utils/comment';

import { getRoomInfo, setRoomHost } from 'redux/room/actions';
import { fetchQuestionList, fetchQuestion } from 'redux/question/actions';
import { createRecordData, setCurrentRecord } from 'redux/record/actions';

import CommentBox from 'components/CommentBox';
import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import ControlWidget from './ControlWidget';

import styles from './DispatchPage.module.scss';

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
    commentBoxVisible: false,
    categoryIndex: 0,
    questionIndex: 0,
    code: '',
    compiledCode: '',
    test: '',
    tape: [],
    tags: [],
    isLoading: false,
  };

  async componentDidMount() {
    if (queryString.parse(this.props.location.search).host) {
      this.props.actions.setRoomHost(true);
    }
    await this.getRoom(this.props.match.params.roomId);
  }

  // for observer
  getRoom = async id => {
    this.setState({ isLoading: true });
    await this.props.actions.getRoomInfo(id);
    await this.setRoomSetting();
    this.setState({ isLoading: false });
  };

  setRoomSetting = async () => {
    // when question has dispatched, append the record data
    if (this.props.record.id) {
      this.subscribeRecordUpdate();
      const { ques, syncCode } = this.props.record;
      if (ques) {
        const { type, content, test } = ques;
        this.getQuestionList(type);
        this.setState({
          categoryIndex: type === 'javascript' ? 0 : 1,
          code: syncCode || content,
          test,
        });
        this.handleCodeChange(syncCode || content);
        // to show the question name
        await this.getQuestionList(type);
        this.setState({
          questionIndex: this.props.question.list.findIndex(
            question => question.name === ques.name,
          ),
        });
      } else {
        await this.getQuestionList('javascript');
        await this.onChangeQuestion(0);
      }
    } else {
      await this.getQuestionList('javascript');
      await this.onChangeQuestion(0);
    }

    this.subscribeCreateRecord();
  };

  getQuestionList = async category => {
    await this.props.actions.fetchQuestionList(category);
    this.props.actions.fetchQuestion(this.props.question.list[0].id);
  };

  onChangeCategory = async index => {
    this.setState({ categoryIndex: index, isLoading: true });
    await this.props.actions.fetchQuestionList(
      index === 0 ? 'javascript' : 'react',
    );
    this.onChangeQuestion(0);
  };

  onChangeQuestion = async index => {
    const { id } = this.props.question.list[index];
    this.setState({ isLoading: true, questionIndex: index });
    await this.props.actions.fetchQuestion(id);
    const { tags, content, test } = this.props.question;
    if (!this.props.record.content) {
      this.setState({
        tags,
        code: content,
        test,
        isLoading: false,
      });
    }
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
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.setState({ code: newCode, compiledCode });
    } catch (e) {
      this.setState({ code: newCode });
    }
  };

  onDispatchQuestion = async () => {
    const { room, question } = this.props;
    this.setState({ isLoading: true });
    try {
      // unsubscribe the old record
      if (this.subscriptionForUpdateRecordByRecordId) {
        this.subscriptionForUpdateRecordByRecordId.unsubscribe();
      }
      const ques = {
        name: question.name,
        type: question.type,
        content: question.content,
        test: question.test,
      };
      await this.props.actions.createRecordData({
        recordTestId: room.test.id,
        subjectId: room.subjectId,
        roomId: room.id,
        ques,
      });
      message.success(`Dispatch "${question.name}" successfully.`);
      // re-subscribe the new record
      this.subscribeRecordUpdate();
      this.setState({ isLoading: false });
    } catch (e) {
      console.log(e);
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
          code: ques.content,
          test: ques.test,
        });
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
            code: syncCode || this.props.record.ques.content,
          });
        }
      },
    );
  };

  onCreateComment = async data => {
    const { id } = this.props.record;
    const { author, content } = data.input;
    const params = {
      commentRecordId: id,
      author,
      content,
    };
    await createComment(params);
    message.success('Add Comment successfully');
    this.setCommentBox();
  };

  setCommentBox = () => {
    const { commentBoxVisible } = this.state;
    this.setState({
      commentBoxVisible: !commentBoxVisible,
    });
  };

  render() {
    const { isLoading, categoryIndex, questionIndex, commentBoxVisible } = this.state;
    const {
      onChangeCategory,
      onChangeQuestion,
      onDispatchQuestion,
      handleCodeChange,
      addTape,
      resetTape,
      onTagUpdate,
      setIntervieweeModal,
      setCommentBox,
    } = this;
    const { room, question, record } = this.props;

    return (
      <React.Fragment>
        <Spin
          className={styles.spin}
          spinning={isLoading}
          size="large"
        >
          {!isLoading && !room.error &&
            <React.Fragment>
              <ControlWidget
                enableComment={!record.id}
                setCommentBox={setCommentBox}
                isHost={room.isHost}
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
            </React.Fragment>
          }
          
          {!isLoading && room.error &&
            <Empty
              className={styles.empty}
              image="http://chittagongit.com//images/found-icon/found-icon-0.jpg"
              description={<span>Room Not Found</span>}
            />
          }
        </Spin>
     
        <CommentBox
          onSubmit={this.onCreateComment}
          visible={commentBoxVisible}
          setVisible={setCommentBox}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      room: state.room,
      record: state.record,
      code: state.code,
      question: state.question,
    }),
    dispatch => ({
      actions: {
        getRoomInfo: id => dispatch(getRoomInfo(id)),
        fetchQuestionList: type => dispatch(fetchQuestionList(type)),
        fetchQuestion: id => dispatch(fetchQuestion(id)),
        createRecordData: params => dispatch(createRecordData(params)),
        setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
        setRoomHost: isHost => dispatch(setRoomHost(isHost)),
      },
    }),
  )(Page),
);
