import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import styles from './Modal.scss';

export default class UserModal extends React.Component {
  state = {
    visible: this.props.visible,
    userName: '',
  }
  constructor(props) {
    super(props);
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  submitName = () => {
    const { userName } = this.state;
    if (this.props.mustEnterName && userName === '') {
      message.error(`Please Enter Interviewer's Name`);
    } else {
      this.props.setInterviewerName(userName);
      this.setState({visible: false});
    }
  }

  render() {
    const { closable } = this.props;
    return (
      <Modal
        title="Enter Interviewer's Name"
        maskClosable={false}
        visible={this.state.visible}
        closable={closable}
        onCancel={this.handleCancel}
        footer={null}>

        <Input
          id="interviewerNameInput"
          placeholder="Enter Name"
          onChange={e => this.setState({userName: e.target.value.trim()})}/>
        <Button 
          id="interviewerNameSubmitBtn"
          onClick={this.submitName}>
          Submit{this.state.userName}
        </Button>
      </Modal>
    );
  }
}