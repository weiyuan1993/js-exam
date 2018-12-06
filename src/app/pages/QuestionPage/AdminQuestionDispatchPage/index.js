import React, { Component } from 'react';

import { dispatchQuestion } from 'app/utils/question';

import {
  createRecord,
  subscribeOnCreateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

import { message } from 'antd';

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
    recordId: ''
  };

  componentDidMount() {
    this.subscribeOnCreateRecord();
  }

  onChangeCategory = index => {
    this.setState({ category: index });
  };

  onDispatchQuestion = async data => {
    try {
      const result = await dispatchQuestion(data);
      this.createRecord();
      message.success(`Dispatching the question "${result.name}" successfully!`);
    } catch (e) {
      message.error(e.message, 2);
    }
  };

  createRecord = async () => {
    const result = await createRecord();
    this.setState({ recordId: result.id });
  };

  subscribeOnCreateRecord = async () => {
    subscribeOnCreateRecord(data => {
      const { id } = data;
      this.setState({ recordId: id });
    });
  };

  render() {
    const { category, recordId } = this.state;
    return (
      <React.Fragment>
        {getPageComponent({
          index: category,
          recordId,
          onDispatchQuestion: this.onDispatchQuestion,
          onChangeCategory: this.onChangeCategory,
          onChangeCode: this.onChangeCode,
          categoryIndex: category,
        })}
      </React.Fragment>
    );
  }
}

export default Page;
