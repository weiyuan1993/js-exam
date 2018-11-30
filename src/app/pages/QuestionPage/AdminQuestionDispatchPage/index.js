import React, { Component } from 'react';

import { updateQuestion, dispatchQuestion } from 'app/utils/question';

import { createRecord, updateRecord } from 'app/utils/record';

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
  constructor(props) {
    super(props);
    this.state = { category: 0 };
  }

  state = {
    category:0,
    recordId:""
  }

  componentDidMount() {}

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
      await dispatchQuestion(data);
      this.createRecordForExam();
    } catch (e) {
      alert(e.message);
    }
  };

  createRecordForExam = async () => {
    try {
      await createRecord();
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnUpdateRecord = async () => {};

  render() {
    const { category } = this.state;
    return (
      <React.Fragment>
        {getPageComponent({
          index: category,
          onSubmit: this.onSubmit,
          onDispatchQuestion: this.onDispatchQuestion,
          onChangeCategory: this.onChangeCategory,
          categoryIndex: category
        })}
      </React.Fragment>
    );
  }
}

export default Page;
