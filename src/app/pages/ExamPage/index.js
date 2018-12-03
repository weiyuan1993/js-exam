import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { transform } from '@babel/standalone';

import { resetQuestion, changeQuestion, changeCode, remoteChangeQuestion } from 'app/actions/code';
import { changeCategory } from 'app/actions/category';
import { resetConsole } from 'app/actions/console';

import createWrappedConsole from 'app/utils/consoleFactory';
import { getStateInformation } from 'app/utils/stateHelper';

import ReactPage from './ReactPage';
import JavaScriptPage from './JavaScriptPage';

import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';

import awsExportConfig from '../../../aws-exports.js';

import * as subscriptions from '../../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

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
    categoryIndex:0,
    code:'',
    compiledCode:'',
    test:'',
    tape:'',
    console:''
  }
  constructor(props) {
    super(props);
    const { actions } = this.props;
    const { _dispatch: dispatch } = actions;
    this.wrappedConsole = createWrappedConsole(console, dispatch);
  }

  componentDidMount() {
    const { isLogin, history, code } = this.props;
    // if (!isLogin) {
    //   history.push('/login');
    //   return;
    // }
    this.handleCodeChange(code);
    this.subscribeOnCreateQuestionSnapshot();
  }

  componentWillUnmount() {
    this.subscriptionDispatchQuestion.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { categoryIndex: previousCategoryIndex } = prevProps;
    const { categoryIndex, code } = this.props;
    if (previousCategoryIndex !== categoryIndex) {
      this.handleCodeChange(code);
    }
  }

  handleCodeChange = (newCode) => {
    // const { actions, type, question } = this.props;
    const {test} = this.state;
    const fullCode = `${newCode} ${test}`;
    try {
      const { code:compiledCode } = transform(fullCode, {
        presets: ['es2015', ['stage-2', { decoratorsBeforeExport: true }], 'react'],
        plugins: ['proposal-object-rest-spread']
      });
      this.setState({compiledCode,code:newCode})
      // actions.changeCode({ compiledCode: code, rawCode: newCode, type });
    } catch (e) {
      // actions.changeCode({ rawCode: newCode, type });
      // actions.resetConsole();
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
    this.setState({categoryIndex:index})
  }
  
  onChangeQuestion = ({ index, type }) => {
    const { actions } = this.props;
    actions.changeQuestion({ index, type });
  }
  
  remoteChangeQuestion({ type, name, code, test }) {
    const { actions } = this.props;
    actions.changeCategory(type == 'javascript' ? 0 : 1);
    actions.remoteChangeQuestion({ type, name, code, test });
  }

  subscribeOnCreateQuestionSnapshot() {
    this.subscriptionDispatchQuestion = API.graphql(
      graphqlOperation(subscriptions.onCreateQuestionSnapshot)
    ).subscribe({
      next: (result) => {
        if (result) {
          console.log("#subscribeOnCreateQuestionSnapshot", result);
          const { type, name, content: code, test } = result.value.data.onCreateQuestionSnapshot
          //this.remoteChangeQuestion({ type, name, code, test });
          this.setState({
            code,
            test
          })
          this.handleCodeChange(code);
        }
      }
    });
  };

  render() {
    const {
      categoryIndex,
      code,
      compiledCode,
      test
    } = this.state;
    const {
      handleCodeChange,
      wrappedConsole,
      onReset,
      onChangeCategory,
      onChangeQuestion,
      onDispatchQuestion
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
            ...this.props,
            code,
            compiledCode,
            test
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
      question,
      remoteQuestion
    } = getStateInformation(state);
    console.log(state)
    return {

      console: state.console,

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
        changeQuestion: ({ index, type }) => dispatch(changeQuestion({ index, type })),
        remoteChangeQuestion: ({ type, name, code, test }) => dispatch(remoteChangeQuestion({ type, name, code, test }))
      }
    };
  }
)(Page));
