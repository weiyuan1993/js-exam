import React, { Component } from 'react';

import { dispatchQuestion } from 'app/utils/question';

import {
  createRecord,
  subscribeOnCreateRecord
} from 'app/utils/record';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

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
      await dispatchQuestion(data);
      this.createRecord();
    } catch (e) {
      alert(e.message);
    }
  };

  createRecord = async () => {
    try {
      const result = await createRecord();
      this.setState({ recordId: result.id });
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnCreateRecord = async () => {
    try {
      subscribeOnCreateRecord(data => {
        const { id } = data;
        this.setState({ recordId: id });
      });
    } catch (e) {
      alert(e.message);
    }
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
