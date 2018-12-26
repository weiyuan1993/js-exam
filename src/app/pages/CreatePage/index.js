import React from 'react';
import { Modal, Button, Input, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getRoomInfo } from 'app/actions/room';

import { createRoom, createTest } from '../../utils/room';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examLink: '',
      visible: false,
      roomName: '',
      userName: '',
      intervieweeName: '',
      roomId: '',
    };
  }


  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  createRoom = async () => {
    if (this.state.userName === '') {
      message.warning('Please enter Name');
    } else {
      const { userName } = this.state;
      const room = await createRoom(userName);
      await createTest(userName);
      this.setState({
        roomId: room.id,
        visible: true,
        examLink: `${document.location.hostname}:3000/exam/${room.id}`,
        roomName: room.description,
        intervieweeName: room.subjectId
      });
    }
  }

  copyLink = () => {
    const link = document.getElementById('ExamLinkCopy');
    link.select();
    document.execCommand('copy');
    message.success('wer');
  }

  toRoom = () => {
    const { roomId, roomName } = this.state;
    const { actions, history } = this.props;
    actions.getRoomInfo(roomName);
    history.push(`/admin/dispatch/${roomId}`);
  }


  render() {
    // const { examLink, visible } = this.props;
    const { visible, examLink, roomName, userName, intervieweeName } = this.state;
    return (
      <div>
        <Input
          placeholder="Enter Name"
          value={userName}
          onChange={e => this.setState({ userName: e.target.value.trim() })}
        />
        <Button
          onClick={this.createRoom}
        >
          Create Room
        </Button>

        <Modal
          visible={visible}
          footer={false}
          title={`WelCome to Room - ${roomName}`}
          onCancel={this.handleCancel}
        >
          <div>
            <p>Interviewee : {intervieweeName}</p>
            <Input
              size="large"
              readOnly
              value={examLink}
              id="ExamLinkCopy"
            />
            <Button onClick={this.copyLink}>
              <Icon type="copy" />
            </Button>
            <Button type="primary" onClick={this.toRoom}>
              Enter Room
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    dispatch => {
      return {
        actions: {
          getRoomInfo: id => dispatch(getRoomInfo(id))
        }
      };
    }
  )(UserModal)
);
