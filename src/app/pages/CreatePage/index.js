import React from 'react';
import { Modal, Button, Input, message, Icon } from 'antd';

import { createRoom, createTest } from '../../utils/room';

export default class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examLink: '',
      visible: false,
      roomId: '',
      userName: '',
      intervieweeName: '',
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
      console.log(room);
      const test = await createTest('WENDY');
      console.log(test);
      this.setState({
        visible: true,
        examLink: `${document.location.hostname}:3000/${room.id}`,
        roomId: room.description,
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


  render() {
    // const { examLink, visible } = this.props;
    const { visible, examLink, roomId, userName, intervieweeName } = this.state;
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
          title={`WelCome to Room - ${roomId}`}
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
          </div>
        </Modal>
      </div>
    );
  }
}
