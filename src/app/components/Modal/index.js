import React from 'react';
import { Modal, Button, Input, message, Select } from 'antd';
import './Modal.scss';

const { Option } = Select;
export default class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      recordId: '',
      recordSyncCode: ''
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

  onChangeSelect = index => {
    this.setState({
      recordId: this.props.recordList[index].id,
      recordSyncCode: this.props.recordList[index].syncCode,
    });
  }

  changeTime = time => {
    const date = new Date(time * 1000);
    return date.toDateString() + date.toTimeString();
  }

  searchName = async () => {
    const { userName } = this.state;
    if (userName === '') {
      message.error('Please Enter Interviewee\'s Name');
    } else {
      this.props.setIntervieweeName(userName);
      await this.props.getRecordListBySubjectId(userName);
      this.onChangeSelect(0);
    }
  }

  joinAction = () => {
    const { recordId, recordSyncCode } = this.state;
    this.props.joinExam({ recordId, recordSyncCode });
  }

  render() {
    const { closable, visible, searchable, recordList } = this.props;
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
        <div id="modalSubmitBtn">
          {
            searchable ? (
              <Button
                id="getRecordListBtn"
                onClick={this.searchName}
              >
                Search
              </Button>
            ) : ''
          }
          <Button
            id="intervieweeNameSubmitBtn"
            onClick={this.submitName}
          >
            Submit
          </Button>
        </div>
        {
          recordList ? (
            <div
              id="searchRecordListStyle"
              style={
                recordList.length > 0 ? { opacity: '1' }
                  : { opacity: '0.5' }
              }
            >
              <Select
                defaultValue={0}
                onChange={this.onChangeSelect}
                style={{ width: '100%' }}
                disabled={recordList.length <= 0}
                placeholder={recordList.length > 0 ? 'Please select to join' : ''}
                size="large"
              >
                {
                  recordList
                    .map((item, index) => (
                      <Option
                        key={item.id}
                        value={index}
                      >
                        {
                          this.changeTime(item.timeBegin)
                        }
                      </Option>
                    ))
                }
              </Select>
              <Button
                id="joinExamBtn"
                onClick={this.joinAction}
              >
                Join
              </Button>
            </div>
          ) : ''
        }
      </Modal>
    );
  }
}
