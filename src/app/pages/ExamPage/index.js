import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';

import { resetConsole } from 'app/actions/console';

import createWrappedConsole from 'app/utils/consoleFactory';
import { subscribeOnCreateQuestionSnapshot } from 'app/utils/question';
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
  state = {
    categoryIndex: 0,
    code: '',
    compiledCode: '',
    questionContent: '',
    test: '',
    tape: []
  };

  wrappedConsole = createWrappedConsole(console, this.props.actions._dispatch);

  componentDidMount() {
    this.subscribeOnDispatchQuestion();
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

  handleCodeChange = (newCode) => {
    const { test } = this.state;
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
    } catch (e) {
      this.setState({ code: newCode });
      this.props.actions.resetConsole();
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

  subscribeOnDispatchQuestion() {
    subscribeOnCreateQuestionSnapshot(({ type, code, test }) => {
      this.setState({
        categoryIndex: type === 'javascript' ? 0 : 1,
        code,
        test,
        questionContent: code
      });
      console.log(this.state)
      const { questionContent } = this.state;
      this.handleCodeChange(questionContent);
    });
  }

  render() {
    const {
      handleCodeChange,
      wrappedConsole,
      onReset,
      addTape,
      resetTape
    } = this;
    return (
      <>
        {getPageComponent({
          handleCodeChange,
          wrappedConsole,
          onReset,
          addTape,
          resetTape,
          ...this.state,
          ...this.props
        })}
      </>
    );
  }
}

export default withRouter(
  connect(
    (state) => {
      return {
        console: state.console
      };
    },
    (dispatch) => {
      return {
        actions: {
          resetConsole: () => dispatch(resetConsole()),
          _dispatch: dispatch
        }
      };
    }
  )(Page)
);
