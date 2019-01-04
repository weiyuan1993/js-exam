import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';
import { message, Spin } from 'antd';

import createWrappedConsole from 'utils/consoleFactory';
import { updateRecord, subscribeOnCreateRecord } from 'utils/record';
import { getRoomInfo, updateRoomInfo } from 'models/room/actions';
import { setCurrentRecord } from 'models/record/actions';

import ControlWidget from './ControlWidget';
import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

const GetPageComponent = args => {
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
    code: '',
    compiledCode: '',
    questionContent: '',
    tape: [],
    console: [],
    visibleIntervieweeModal: true,
    isLoading: false,
    enableEnter: true,
  };

  roomId = this.props.match.params.roomId;

  componentDidMount() {
    this.wrappedConsole = createWrappedConsole(console, this.addConsole);
    this.getRoom();
    this.subscribeCreateRecord();
  }

  getRoom = async () => {
    this.setState({
      isLoading: true,
    });
    await this.props.actions.getRoomInfo(this.roomId);
    await this.passwordSetting(this.props.room.password);
    this.setState({ isLoading: false });
  };

  passwordSetting = async roomPassword => {
    const { roomId } = this;
    const { record } = this.props;
    if (!roomPassword) {
      const password = Math.random()
        .toString(15)
        .substr(2);
      localStorage.examRoomPassword = password;
      await this.props.actions.updateRoomInfo(roomId, password);
    } else if (localStorage.examRoomPassword === roomPassword) {
      if (record.ques) {
        this.setState({
          categoryIndex: record.ques.type === 'javascript' ? 0 : 1,
          code: record.syncCode || '',
          test: record.ques.test || '',
        });
        this.handleCodeChange(record.syncCode);
      }
    } else {
      message.error("You Can't Not Enter the Page");
      this.setState({
        enableEnter: false,
      });
    }
  };

  handleCodeChange = async newCode => {
    const { ques, id } = this.props.record;
    const fullCode = `${newCode} ${ques.test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.setState({ compiledCode, code: newCode });
      await updateRecord(id, newCode);
    } catch (e) {
      this.setState({ code: newCode });
      this.resetConsole();
      this.wrappedConsole.log(e);
      await updateRecord(id, newCode);
    }
  };

  onReset = () => {
    const { content } = this.props.record.ques;
    this.setState({ code: content });
    this.handleCodeChange(content);
  };

  addTape = newTape => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  addConsole = (...args) => {
    const { console: _console } = this.state;
    this.setState({ console: [..._console, ...args] });
  };

  resetConsole = () => {
    this.setState({ console: [] });
  };

  subscribeCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room.id === this.props.room.id) {
        this.props.actions.setCurrentRecord(data);
        // to receive new question dispatched
        this.setState({
          categoryIndex: data.ques.type === 'javascript' ? 0 : 1,
          code: ques.content,
          test: ques.test,
        });
        this.handleCodeChange(ques.content);
      }
    });
  };

  render() {
    const {
      handleCodeChange,
      wrappedConsole,
      onReset,
      addTape,
      resetTape,
      resetConsole,
    } = this;
    const { isLoading, enableEnter } = this.state;
    const { room } = this.props;
    return (
      <div>
        <Spin spinning={isLoading}>
          {enableEnter ? (
            <>
              <ControlWidget
                roomDescription={room.description}
                intervieweeName={room.subjectId}
                onReset={onReset}
              />
              <GetPageComponent
                handleCodeChange={handleCodeChange}
                wrappedConsole={wrappedConsole}
                onReset={onReset}
                addTape={addTape}
                resetTape={resetTape}
                resetConsole={resetConsole}
                {...this.state}
                {...this.props}
              />
            </>
          ) : (
            <div>
              <h1>WRONG EXAM ROOM</h1>
            </div>
          )}
        </Spin>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      room: state.room,
      record: state.record,
    }),
    dispatch => ({
      actions: {
        getRoomInfo: id => dispatch(getRoomInfo(id)),
        updateRoomInfo: (id, password) =>
          dispatch(updateRoomInfo(id, password)),
        setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
      },
    }),
  )(Page),
);
