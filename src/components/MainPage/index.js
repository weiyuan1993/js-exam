import _ from 'underscore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transform } from 'buble';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/textmate';
import AceEditor from 'react-ace';
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';

import QuestionSelector from './QuestionSelector';
import questions from '../../questions';
import { changeCode , changeQuestion , resetQuestion } from '../../actions/code';
import './MainPage.css';
import debouncedRunCode from '../../utils/runCode';

const socket = io('http://localhost:8080');

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.testsRef = null;
    this.timerId = null;
    this.state = { SyntaxError : '' } ;
    this.handleSelected = this.handleSelected.bind(this);
    this.handleCodeChange = _.debounce(this.handleCodeChange.bind(this), 100);

    this.actions = this.props.actions ;
    this.resetQuestion = this.actions.resetQuestion ;
    this.changeQuestion = this.actions.changeQuestion ;
    this.changeCode = this.actions.changeCode ;
    this.changeSyntaxError = this.actions.changeSyntaxError ;
    this.saveCode = this.saveCode.bind(this);
  }

  componentDidMount() {
    // if (!this.props.isLogin) {
    //   this.props.history.push('/js-exam/login');
    //   return;
    // }
    const { rawCode } = this.props;
    this.handleCodeChange(rawCode);
    this.timerId = setInterval(this.saveCode, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentWillUpdate(nextProps, nextState) {
    const { compiledCode } = nextProps ;
    if (this.testsRef) {
      this.testsRef.innerHTML = '';
      debouncedRunCode(compiledCode);
    }
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.index !== nextProps.index || nextProps.compiledCode === '' ){
      this.handleCodeChange(nextProps.rawCode) ;
    }
  }

  saveCode() {
    socket.emit('code', {
      question: this.props.index,
      code: this.props.rawCode
    });
  }

  handleSelected(index) {
    this.changeQuestion(index);
  }

  handleCodeChange(newCode) {
    try {
      const { code } = transform(newCode);
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
    const { rawCode , index } = this.props ;
    return (
      <div className="App">
        <AceEditor
          mode="javascript"
          theme="textmate"
          onChange={this.handleCodeChange}
          value={rawCode}
        />
        <div>
          <div className="additional-info">
            <QuestionSelector
              handleSelected={this.handleSelected}
              activeIndex={index}
            />
            <Button
              variant="outlined"
              onClick={(this.resetQuestion)}
            >
              Reset
            </Button>
            {!this.state.SyntaxError
              ? null
              : <div className="syntax-error">
                  {this.state.SyntaxError}
                </div>}
          </div>

          <div id="tests" ref={ref => (this.testsRef = ref)} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => {
    const { code : codeObj } = state ;
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
        resetQuestion : () => dispatch(resetQuestion())
      }
    };
  }
)(MainPage));
