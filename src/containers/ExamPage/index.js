import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { transform } from '@babel/standalone';
import { message, Spin, Modal } from 'antd';

import createWrappedConsole from 'utils/consoleFactory';
import { subscribeOnCreateRecord } from 'utils/record';
import { getRoomInfo, updateRoomInfo } from 'redux/room/actions';
import { setCurrentRecord } from 'redux/record/actions';

import ControlWidget from 'components/Widgets/ExamControlWidget';
import ReactPage from 'components/CodingView/React';
import JavaScriptPage from 'components/CodingView/JavaScript';

import { changeCode, resetCode } from 'redux/code/actions';
import { addConsole, resetConsole } from 'redux/consoleMsg/actions';
import { addTape, resetTape } from 'redux/tape/actions';

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
    isLoading: false,
    enableEnter: true,
  };

  roomId = this.props.match.params.roomId;

  wrappedConsole = createWrappedConsole(console, this.props.actions.addConsole);

  componentDidMount() {
    this.getRoom();
    this.subscribeCreateRecord();
  }

  getRoom = async () => {
    this.setState({
      isLoading: true,
    });
    await this.props.actions.getRoomInfo(this.roomId);
    if (this.props.room.description) {
      await this.passwordSetting();
      window.addEventListener('keydown', e => {
        if (e.ctrlKey && e.keyCode === 13) {
          this.onRunCode();
        }
      });
    } else {
      this.setState({
        enableEnter: false,
      });
    }
    this.setState({ isLoading: false });
  };

  passwordSetting = async () => {
    const { roomId } = this;
    const { record, room } = this.props;
    if (!room.password) {
      await this.props.actions.updateRoomInfo(roomId);
      this.getRecordOnEntry(record);
    } else if (localStorage.examRoomPassword === room.password) {
      this.getRecordOnEntry(record);
    } else {
      message.error("You Can't Not Enter the Page");
      this.setState({
        enableEnter: false,
      });
    }
  };

  getRecordOnEntry = record => {
    if (record.ques) {
      this.setState({
        categoryIndex: record.ques.type === QUESTION_TYPE.JAVASCRIPT ? 0 : 1,
      });
      this.handleCodeChange(record.syncCode || '');
      this.onRunCode();
    }
  };

  handleCodeChange = newCode => {
    const { rawCode } = this.props.code;
    const { id } = this.props.record;
    if (newCode && newCode !== rawCode) {
      this.props.actions.changeCode({ rawCode: newCode });
      this.props.actions.updateRecordData({ id, syncCode: newCode });
    }
  };

  onRunCode = () => {
    const { rawCode } = this.props.code;
    const { ques } = this.props.record;
    const fullCode = `${rawCode} ${ques.test}`;
    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react',
        ],
        plugins: ['proposal-object-rest-spread'],
      });
      this.props.actions.changeCode({ compiledCode });
    } catch (e) {
      this.props.actions.resetConsole();
      this.wrappedConsole.log(e);
    }
  };

  onReset = () => {
    const { content } = this.props.record.ques;
    this.handleCodeChange(content);
    this.props.actions.resetTape();
    this.props.actions.resetConsole();
  };

  subscribeCreateRecord = () => {
    subscribeOnCreateRecord(data => {
      const { room, ques } = data;
      if (room.id === this.props.room.id) {
        this.props.actions.setCurrentRecord(data);
        this.setState({
          categoryIndex: data.ques.type === QUESTION_TYPE.JAVASCRIPT ? 0 : 1,
        });
        this.handleCodeChange(ques.content);
        this.props.actions.resetTape();
        this.props.actions.resetConsole();
        this.onRunCode();
      }
    });
  };

  showResetAlert = () => {
    const self = this;
    Modal.confirm({
      title: 'Do you want to reset your code?',
      onOk() {
        self.onReset();
      },
      onCancel() {},
    });
  };

  render() {
    const {
      handleCodeChange,
      wrappedConsole,
      onRunCode,
      showResetAlert,
    } = this;
    const { categoryIndex, isLoading, enableEnter } = this.state;
    const { room, record, code, consoleMsg, tape } = this.props;
    const { addTape, resetTape, resetConsole } = this.props.actions;

    return (
      <div>
        <Spin spinning={isLoading}>
          {enableEnter ? (
            <>
              <ControlWidget
                roomDescription={room.description}
                intervieweeName={room.subjectId}
                onRunCode={onRunCode}
                onReset={showResetAlert}
              />
              <GetPageComponent
                categoryIndex={categoryIndex}
                handleCodeChange={handleCodeChange}
                wrappedConsole={wrappedConsole}
                addTape={addTape}
                resetTape={resetTape}
                resetConsole={resetConsole}
                code={code.rawCode}
                compiledCode={code.compiledCode}
                consoleMsg={consoleMsg}
                tape={tape}
                test={record.ques && record.ques.test}
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
  code: PropTypes.object,
  consoleMsg: PropTypes.array,
  tape: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  actions: {
    getRoomInfo: id => dispatch(getRoomInfo(id)),
    updateRoomInfo: (id, password) => dispatch(updateRoomInfo(id, password)),
    updateRecordData: recordData => dispatch(updateRecordData(recordData)),
    setCurrentRecord: recordData => dispatch(setCurrentRecord(recordData)),
    changeCode: code => dispatch(changeCode(code)),
    resetCode: () => dispatch(resetCode()),
    addConsole: (...args) => dispatch(addConsole(...args)),
    resetConsole: () => dispatch(resetConsole()),
    addTape: data => dispatch(addTape(data)),
    resetTape: () => dispatch(resetTape()),
  },
});

const mapStateToProps = state => ({
  room: state.room,
  record: state.record,
  code: state.code,
  consoleMsg: state.consoleMsg,
  tape: state.tape,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExamPage);
