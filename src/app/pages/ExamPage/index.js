import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';

// import { resetConsole } from 'app/actions/console';

import createWrappedConsole from 'app/utils/consoleFactory';
import { subscribeOnCreateQuestionSnapshot } from 'app/utils/question';
import { subscribeOnCreateRecord, updateRecord } from 'app/utils/record';
import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

const getPageComponent = (args) => {
  switch (args.categoryIndex) {
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
    this.state = {
      categoryIndex: 0,
      code: '',
      compiledCode: '',
      questionContent: '',
      test: '',
      tape: [],
      recordId: '',
      console: []
    };
    this.wrappedConsole = createWrappedConsole(console, this.addConsole);
  }

  componentDidMount() {
    this.subscribeOnDispatchQuestion();
    this.subscribeOnCreateRecord();
  }

  componentDidUpdate(prevProps) {
    const { categoryIndex: previousCategoryIndex } = prevProps;
    const { categoryIndex, code } = this.props;
    if (previousCategoryIndex !== categoryIndex) {
      this.handleCodeChange(code);
    }
  }

  componentWillUnmount() {
    // this.subscriptionDispatchQuestion.unsubscribe();
  }

  updateRecordAction= async (recordId, newCode) => {
    try {
      const result = await updateRecord(recordId, newCode);
    } catch (e) {
      alert(e.message);
    }
  }

  handleCodeChange = (newCode) => {
    const { test, recordId } = this.state;
    const fullCode = `${newCode} ${test}`;

    try {
      const { code: compiledCode } = transform(fullCode, {
        presets: [
          'es2015',
          ['stage-2', { decoratorsBeforeExport: true }],
          'react'
        ],
        plugins: ['proposal-object-rest-spread']
      });
      this.setState({ compiledCode, code: newCode });
      if (recordId !== '') {
        this.updateRecordAction(recordId, newCode);
      }
    } catch (e) {
      this.setState({ code: newCode });
      this.resetConsole();
      this.wrappedConsole.log(e);
    }
  };

  onReset = (type) => {
    const { questionContent } = this.state;
    this.setState({ code: questionContent });
    this.handleCodeChange(questionContent);
  };

  addTape = (newTape) => {
    const { tape } = this.state;
    this.setState({ tape: [...tape, newTape] });
  };

  resetTape = () => {
    this.setState({ tape: [] });
  };

  addConsole = (...args) => {
    const { console: _console } = this.state;
    this.setState({ console: [..._console, ...args] });
  };

  resetConsole = () => {
    this.setState({ console: [] });
  };

  subscribeOnCreateRecord = async () => {
    try {
      subscribeOnCreateRecord(({ data }) => {
        const { id } = data.onCreateRecord;
        this.setState({
          recordId: id
        });
      });
    } catch (e) {
      alert(e.message);
    }
  };

  subscribeOnDispatchQuestion = async () => {
    subscribeOnCreateQuestionSnapshot(({ data }) => {
      const { type, content: code, test } = data.onCreateQuestionSnapshot;
      this.setState({
        categoryIndex: type === 'javascript' ? 0 : 1,
        code,
        test,
        questionContent: code
      });
      const { questionContent } = this.state;
      this.handleCodeChange(questionContent);
    });
  };

  render() {
    const {
      handleCodeChange,
      wrappedConsole,
      onReset,
      addTape,
      resetTape,
      resetConsole
    } = this;
    return (
      <>
        {getPageComponent({
          handleCodeChange,
          wrappedConsole,
          onReset,
          addTape,
          resetTape,
          resetConsole,
          ...this.state,
          ...this.props
        })}
      </>
    );
  }
}

export default withRouter(Page);
