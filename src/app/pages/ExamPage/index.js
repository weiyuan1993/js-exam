import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';

import { resetQuestion, changeQuestion, changeCode } from 'app/actions/code';
import { changeCategory } from 'app/actions/category';
import { resetConsole } from 'app/actions/console';

import createWrappedConsole from 'app/utils/consoleFactory';
import { getStateInformation } from 'app/utils/stateHelper';

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
    const { actions } = this.props;
    const { _dispatch: dispatch } = actions;
    this.wrappedConsole = createWrappedConsole(console, dispatch);
  }

  componentDidMount() {
    const { isLogin, history, code } = this.props;
    if (!isLogin) {
      history.push('/login');
      return;
    }
    this.handleCodeChange(code);
  }

  componentDidUpdate(prevProps) {
    const { categoryIndex: previousCategoryIndex } = prevProps;
    const { categoryIndex, code } = this.props;
    if (previousCategoryIndex !== categoryIndex) {
      this.handleCodeChange(code);
    }
  }

  handleCodeChange = (newCode) => {
    const { actions, type, question } = this.props;
    const fullCode = `${newCode} ${question.test}`;
    try {
      const { code } = transform(fullCode, {
        presets: ['es2015', ['stage-2', { decoratorsBeforeExport: true }], 'react'],
        plugins: ['proposal-object-rest-spread']
      });
      actions.changeCode({ compiledCode: code, rawCode: newCode, type });
    } catch (e) {
      actions.changeCode({ rawCode: newCode, type });
      actions.resetConsole();
      this.wrappedConsole.log(e);
    }
  }


  onReset = (type) => {
    const { actions } = this.props;
    actions.resetQuestion(type);
  }

  onChangeCategory = (index) => {
    const { actions } = this.props;
    actions.changeCategory(index);
  }

  onChangeQuestion = ({ index, type }) => {
    const { actions } = this.props;
    actions.changeQuestion({ index, type });
  }

  render() {
    const {
      categoryIndex
    } = this.props;
    const {
      handleCodeChange,
      wrappedConsole,
      onReset,
      onChangeCategory,
      onChangeQuestion
    } = this;
    return (
      <>
        {
          getPageComponent({
            index: categoryIndex,
            handleCodeChange,
            wrappedConsole,
            onReset,
            onChangeCategory,
            onChangeQuestion,
            ...this.props
          })
        }
      </>
    );
  }
}

export default withRouter(connect(
  (state) => {
    const {
      code,
      questionIndex,
      compiledCode,
      categoryIndex,
      type,
      question
    } = getStateInformation(state);
    return {
      compiledCode,
      questionIndex,
      code,
      console: state.console,
      categoryIndex,
      type,
      question,
      isLogin: state.login.isLogin
    };
  },
  (dispatch) => {
    return {
      actions: {
        resetConsole: () => dispatch(resetConsole()),
        changeCode: args => dispatch(changeCode({ ...args, type: (args.type || 'javascript').toUpperCase() })),
        _dispatch: dispatch,
        resetQuestion: type => dispatch(resetQuestion({ type: type.toUpperCase() })),
        changeCategory: index => dispatch(changeCategory(index)),
        changeQuestion: ({ index, type }) => dispatch(changeQuestion({ index, type }))
      }
    };
  }
)(Page));
