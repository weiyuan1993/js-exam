import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import styles from './Modal.scss';

export default class UserModal extends React.Component {
  state = {
    userName: '',
  }

  // constructor(props) {
  //   super(props);
  // }

  submitName = () => {
    const { userName } = this.state;
    if (this.props.mustEnterName && userName === '') {
      message.error('Please Enter Interviewer\'s Name');
    } else {
      this.props.setInterviewerName(userName);
      this.props.setInterviewerModal();
    }
  }

  render() {
    const { closable, setInterviewerModal, visible } = this.props;
    const { userName } = this.state;
    return (
      <Modal
        title="Enter Interviewer's Name"
        maskClosable={false}
        visible={visible}
        closable={closable}
        onCancel={setInterviewerModal}
        footer={null}
      >

        <Input
          id="interviewerNameInput"
          placeholder="Enter Name"
          onChange={e => this.setState({ userName: e.target.value.trim() })}
        />
        <Button
          id="interviewerNameSubmitBtn"
          onClick={this.submitName}
        >
          {`Submit${userName}`}
        </Button>
      </Modal>
    );
  }
}