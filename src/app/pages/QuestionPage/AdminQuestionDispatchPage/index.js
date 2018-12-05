import React, { Component } from 'react';

import { updateQuestion, dispatchQuestion } from 'app/utils/question';

import {
  createRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord,
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
    recordId: '',
    code: '',
  };

  componentDidMount() {
    this.subscribeOnCreateRecord();
    this.subscribeOnUpdateRecord();
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
      subscribeOnCreateRecord(({ data }) => {
        const { id } = data.onCreateRecord;
        this.setState({ recordId: id });
      });
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnUpdateRecord = async () => {
    try {
      subscribeOnUpdateRecord(({ data }) => {
        const { id, history } = data.onUpdateRecord;
        const { recordId } = this.state;
        if (id === recordId) {
          const [code] = history;
          this.setState({ code });
        }
      });
    } catch (e) {
      alert(e.message);
    }
  };


  onChangeCode = async () => {};

  render() {
    const { category, recordId, code } = this.state;
    return (
      <React.Fragment>
        {getPageComponent({
          index: category,
          recordId,
          code,
          onSubmit: this.onSubmit,
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
