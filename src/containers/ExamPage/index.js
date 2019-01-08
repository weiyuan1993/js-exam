import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { transform } from '@babel/standalone';
import { message, Spin } from 'antd';

import createWrappedConsole from 'utils/consoleFactory';
import { subscribeOnCreateRecord } from 'utils/record';
import { getRoomInfo, updateRoomInfo } from 'models/room/actions';
import { setCurrentRecord } from 'models/record/actions';

import ControlWidget from 'components/Widgets/ExamControlWidget';
import ReactPage from 'components/CodingView/React';
import JavaScriptPage from 'components/CodingView/JavaScript';

import { updateRecordData } from './actions';
import { QUESTION_TYPE } from './constants';

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

class ExamPage extends Component {
  state = {
    categoryIndex: 0,
    code: '',
    compiledCode: '',
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
    await this.passwordSetting();
    this.setState({ isLoading: false });
  };

  passwordSetting = async () => {
    const { roomId } = this;
    const { record, room } = this.props;
    if (!room.password) {
      await this.props.actions.updateRoomInfo(roomId);
    } else if (localStorage.examRoomPassword === room.password) {
      if (record.ques) {
        this.setState(
          {
            categoryIndex:
              record.ques.type === QUESTION_TYPE.JAVASCRIPT ? 0 : 1,
            code: record.syncCode || '',
            test: record.ques.test || '',
          },
          () => this.handleCodeChange(record.syncCode),
        );
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
      if (newCode === this.state.code) return;
      await this.props.actions.updateRecordData({ id, newCode });
    } catch (e) {
      this.setState({ code: newCode });
      this.resetConsole();
      this.wrappedConsole.log(e);
      await this.props.actions.updateRecordData({ id, newCode });
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
          categoryIndex: data.ques.type === QUESTION_TYPE.JAVASCRIPT ? 0 : 1,
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

ExamPage.propTypes = {
  room: PropTypes.object,
  record: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getRoomInfo: id => dispatch(getRoomInfo(id)),
    updateRoomInfo: (id, password) => dispatch(updateRoomInfo(id, password)),
    updateRecordData: recordData => dispatch(updateRecordData(recordData)),
    setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
  },
});

const mapStateToProps = state => ({
  room: state.room,
  record: state.record,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExamPage);
