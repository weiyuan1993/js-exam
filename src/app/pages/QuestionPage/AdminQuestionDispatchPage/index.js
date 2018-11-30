import React, { Component } from 'react';

import { updateQuestion, dispatchQuestion } from 'app/utils/question';

import {
  createRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

const getPageComponent = (args) => {
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
    recordId: ''
  };

  componentDidMount() {
    this.subscribeOnCreateRecord();
  }

  onChangeCategory = (index) => {
    this.setState({ category: index });
  };

  onSubmit = async (data) => {
    try {
      await updateQuestion(data);
    } catch (e) {
      alert(e.message);
    }
  };

  onDispatchQuestion = async (data) => {
    try {
      const result = await dispatchQuestion(data);

      this.createRecordForExam();
    } catch (e) {
      alert(e.message);
    }
  };

  createRecordForExam = async () => {
    try {
      const result = await createRecord();
      this.setState({ recordId: result.id });
      console.log(this.state.recordId);
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnCreateRecord = async () => {
    try {
      subscribeOnCreateRecord(({ data }) => {
        const { id, history } = data.onCreateRecord;
        const { recordId } = this.state;
        if (id === recordId) {
          console.log(data.onCreateRecord);
        }
      });
    } catch (e) {
      alert(e.message);
    }
  };


  onChangeCode = async () => {};

  render() {
    const { category, recordId } = this.state;
    return (
      <React.Fragment>
        {getPageComponent({
          index: category,
          recordId,
          onSubmit: this.onSubmit,
          onDispatchQuestion: this.onDispatchQuestion,
          onChangeCategory: this.onChangeCategory,
          onChangeCode: this.onChangeCode,
          categoryIndex: category
        })}
      </React.Fragment>
    );
  }
}

export default Page;
