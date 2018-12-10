import React, { Component } from 'react';
import { message } from 'antd';

import { dispatchQuestion } from 'app/utils/question';

import {
  createRecord,
  subscribeOnCreateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';
import UserModal from 'app/components/Modal';


const getPageComponent = args => {
  switch (args.index) {
    case 1: {
      return <ReactPage {...args} />;
    }
    default: {
      return <JavaScriptPage {...args} />;
    }
  }
};

class Page extends Component {
  state = {
    category: 0,
    recordId: '',
    interviewerName: '',
    visibleInterviewerModal: true,
  };

  constructor(props) {
    super(props);
    this.setInterviewerName = this.setInterviewerName.bind(this);
  }

  componentDidMount() {
    this.subscribeOnCreateRecord();
  }

  setInterviewerName = name => {
    this.setState({ interviewerName: name });
    message.success(name)
  }


  onChangeCategory = index => {
    this.setState({ category: index });
  };

  onDispatchQuestion = async data => {
    const { interviewerName } = this.state;
    try {
      if (interviewerName === '') {
        message.warning('Please Enter Interviewer First.')
      } else {
        await dispatchQuestion(data);
        this.createRecord(interviewerName);
        message.success(`Dispatching the question "${interviewerName}" successfully!`);
      }
    } catch (e) {
      message.error(e.message, 2);
    }
  };

  setInterviewerModal = () => {
    const { visibleInterviewerModal } = this.state;
    this.setState({ visibleInterviewerModal: !visibleInterviewerModal });
  }

  createRecord = async interviewerName => {
    try {
      const result = await createRecord(interviewerName);
      this.setState({ recordId: result.id });
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnCreateRecord = async () => {
    subscribeOnCreateRecord(data => {
      const { id } = data;
      this.setState({ recordId: id });
    });
  };

  render() {
    const {
      category,
      recordId,
      interviewerName,
      visibleInterviewerModal,
    } = this.state;
    return (
      <React.Fragment>
        {getPageComponent({
          index: category,
          recordId,
          interviewerName,
          onDispatchQuestion: this.onDispatchQuestion,
          onChangeCategory: this.onChangeCategory,
          onChangeCode: this.onChangeCode,
          categoryIndex: category,
        })}
        <UserModal
          setInterviewerModal={this.setInterviewerModal}
          mustEnterName={false}
          closable
          setInterviewerName={this.setInterviewerName}
          visible={visibleInterviewerModal}
        />
      </React.Fragment>
    );
  }
}

export default Page;
