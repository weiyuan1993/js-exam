import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import './Modal.scss';

export default class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }

  handleCancel = () => {
    this.props.setIntervieweeModal();
    this.setState({ userName: '' });
  }

  submitName = () => {
    const { userName } = this.state;
    if (this.props.mustEnterName && userName === '') {
      message.error('Please Enter Interviewee\'s Name');
    } else {
      this.props.setIntervieweeName(userName);
      this.props.setIntervieweeModal();
      this.setState({ userName: '' });
    }
  }

  render() {
    const { closable, visible } = this.props;
    const { userName } = this.state;
    return (
      <Modal
        title="Enter Interviewee's Name"
        maskClosable={false}
        visible={visible}
        closable={closable}
        onCancel={this.handleCancel}
        footer={null}
      >
        <Input
          id="intervieweeNameInput"
          placeholder="Enter Name"
          value={userName}
          onChange={e => this.setState({ userName: e.target.value.trim() })}
        />
        <Button
          id="intervieweeNameSubmitBtn"
          onClick={this.submitName}
        >
          {`Submit${userName}`}
        </Button>
      </Modal>
    );
  }
}
