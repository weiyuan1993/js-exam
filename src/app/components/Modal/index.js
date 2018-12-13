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
      recordSyncCode: '',
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

  onChangeSelect = (e) => {
    const record = this.props.recordList.find(item => {
      return item.id === e;
    });
    this.setState({
      recordId: record.id,
      recordSyncCode: record.syncCode
    });
  }

  changeTime = time => {
    const date = new Date(time * 1000);
    return date.toDateString() + date.toTimeString();
  }

  searchName = () => {
    const { userName } = this.state;
    if (userName === '') {
      message.error('Please Enter Interviewee\'s Name');
    } else {
      this.props.setIntervieweeName(userName);
      this.props.getRecordListBySubjectId(userName);
    }
  }

  joinAction = () => {
    const { recordId, recordSyncCode } = this.state;
    this.props.joinExam({ recordId, recordSyncCode });
  }

  render() {
    const { closable, visible, searchable, recordList } = this.props;
    const { userName, recordId } = this.state;
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
                onChange={this.onChangeSelect}
                style={{ width: '100%' }}
                disabled={recordList.length <= 0}
                placeholder={recordList.length > 0 ? 'Place Select to Join' : ''}
                size="large"
              >
                {
                  Object.values(recordList).map(
                    item => (
                      <Option
                        key={item.id}
                        onChange={this.onChange}
                      >
                        {
                          this.changeTime(item.timeBegin)
                        }
                      </Option>
                    )
                  )
                }
              </Select>
              <Button
                id="joinExamBtn"
                onClick={this.joinAction}
                disabled={recordId === ''}
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
