import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import styles from './Modal.scss';

export default class UserModal extends React.Component {
  state = {
    userName: '',
  }


  submitName = () => {
    const { userName } = this.state;
    if (this.props.mustEnterName && userName === '') {
      message.error('Please Enter Interviewee\'s Name');
    } else {
      this.props.setIntervieweeName(userName);
      this.props.setIntervieweeModal();
    }
  }

  render() {
    const { closable, setIntervieweeModal, visible } = this.props;
    const { userName } = this.state;
    return (
      <Modal
        title="Enter Interviewee's Name"
        maskClosable={false}
        visible={visible}
        closable={closable}
        onCancel={setIntervieweeModal}
        footer={null}
      >
        <Input
          id="intervieweeNameInput"
          placeholder="Enter Name"
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
