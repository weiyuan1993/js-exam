import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transform } from 'buble';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import 'brace/theme/monokai';
import AceEditor from 'react-ace';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

import QuestionSelector from './QuestionSelector';
import questions from '../../questions';
import {
  changeCode,
  changeQuestion,
  resetQuestion
} from '../../actions/code';
import {
  resetConsole
} from '../../actions/console';
import './MainPage.css';
import debouncedRunCode from '../../utils/runCode';
import Border from './Border';
import Console from './Console';
import createWrappedConsole from '../../utils/consoleFactory';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.testsRef = React.createRef();
    this.wrappedConsole = createWrappedConsole(console, this.props.actions._dispatch);
    this.state = { SyntaxError : '' } ;
    this.handleSelected = this.handleSelected.bind(this);
    // this.handleCodeChange = _.debounce(this.handleCodeChange.bind(this), 800);
    this.handleCodeChange = this.handleCodeChange.bind(this);

    this.actions = this.props.actions ;
    this.resetQuestion = this.actions.resetQuestion ;
    this.changeQuestion = this.actions.changeQuestion ;
    this.changeCode = this.actions.changeCode;
    this.resetConsole = this.actions.resetConsole;
    this.changeSyntaxError = this.actions.changeSyntaxError;
  }

  componentDidMount() {
    // if (!this.props.isLogin) {
    //   this.props.history.push('/js-exam/login');
    //   return;
    // }
    const { rawCode } = this.props ;
    this.handleCodeChange(rawCode);
  }

  componentWillUpdate(nextProps, nextState) {
    const { compiledCode } = nextProps;
    if (this.testsRef.current) {
      this.testsRef.current.innerHTML = '';
      debouncedRunCode(compiledCode, this.wrappedConsole);
    }
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.index !== nextProps.index || nextProps.compiledCode === '' ){
      this.handleCodeChange(nextProps.rawCode) ;
    }
  }

  handleSelected(index) {
    this.changeQuestion(index);
  }

  handleCodeChange(newCode) {
    const fullCode = `${newCode} ${questions[this.props.index].test}`;
    this.resetConsole();
    try {
      /*
        not support
        [...'abc'],
        async & await
      */
      const { code } = transform(fullCode, {
        transforms: {
          dangerousForOf: true,
          spreadRest: true,
          objectRestSpread: true
        },
        objectAssign: 'Object.assign',
      });
      this.changeCode({ compiledCode : code , rawCode : newCode });
      this.setState({ 'SyntaxError' : '' }) ;
    } catch (e) {
      this.changeCode({ rawCode : newCode });
      if (e.loc) {
        const { line, column } = e.loc;
        this.setState({ SyntaxError : `Syntax error: line ${line}, column ${column}` }) ;
      }
    }
  }

  render() {
    const { rawCode , index } = this.props;
    return (
      <div className="App">
        <Border className="input-panel" allowWidth>
          <Border
            className="code-panel"
            allowHeight
            width={window.innerWidth / 2}
            height={window.innerHeight / 2}
          >
            <AceEditor
              showPrintMargin={false}
              mode="javascript"
              theme="monokai"
              onChange={this.handleCodeChange}
              value={rawCode}
              tabSize={2}
              debounceChangePeriod={800}
            />
          </Border>
          <div
            className="test-panel"
          >
            <AceEditor
              showPrintMargin={false}
              mode="javascript"
              theme="textmate"
              value={questions[index].test}
              readOnly={true}
              tabSize={2}
              debounceChangePeriod={800}
            />
          </div>
        </Border>
        <div className="result-panel">
          <div className="top-panel">
            <div className="additional-info">
              <QuestionSelector
                handleSelected={this.handleSelected}
                activeIndex={index}
              />
              <Button type="danger" onClick={(this.resetQuestion)}>Reset</Button>
              {!this.state.SyntaxError
                ? null
                : <div className="syntax-error">
                    {this.state.SyntaxError}
                  </div>}
            </div>
            <Border
              className="control-panel"
              allowHeight
              width={window.innerWidth / 2}
              height={window.innerHeight / 2}
            >
              <div id="tests" ref={this.testsRef} />
            </Border>
          </div>
          <Console className="bottom-panel"/>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => {
    const { code : codeObj } = state ;
    // console.log("#state to props: state", state);
    // console.log("#state to props: state",  codeObj);
    const { index } = codeObj ;
    const compiledCode = codeObj.compiledCode ;
    const rawCode = ( codeObj[index] && codeObj[index].code ) || questions[index].content ;
    return {
      rawCode ,
      compiledCode ,
      index,
      isLogin: state.login.isLogin
    };
  },
  dispatch => {
    return {
      actions: {
        changeCode: (args) => dispatch(changeCode(args)) ,
        changeQuestion : index => dispatch(changeQuestion(index)) ,
        resetQuestion : () => dispatch(resetQuestion()),
        _dispatch: dispatch,
        resetConsole: () => dispatch(resetConsole())
      }
    };
  }
)(MainPage));
