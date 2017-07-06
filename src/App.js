import _ from 'underscore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import vm from 'vm';
import { transform } from 'buble';
import sinon from 'sinon';

import CodeMirror from 'react-codemirror';

import { changeCode , changeQuestion , resetQuestion } from './actions/code';
import './App.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import questions from './questions';

function spy(obj, methodName) {
  const origFn = obj[methodName];
  let callHistory = [];
  let calledWith = {};

  const secret = Math.random().toFixed(4) + '';
  obj[methodName] = (...args) => {
    const result = origFn.apply(obj, args);
    callHistory.push(args);
    calledWith[args.join(secret)] = true;
    return result;
  };
  return {
    calledWith: (...args) => !!calledWith[args.join(secret)],
    callCount: () => callHistory.length,
    restore: () => (obj[methodName] = origFn)
  };
}

function runCode(code) {
  delete require.cache[require.resolve('tape')];
  const tape = require('tape');
  require('tape-dom')(tape);
  const test = (function(tape) {
    return (...args) => {
      const [cb] = args.slice(-1);
      if(typeof cb !== 'function') {
        throw new Error('should provide callback');
      }
      tape(...args.slice(0, -1), t => {
        t.subtest = (comment, testBlock) => {
          if(!testBlock) {
            testBlock = comment;
            comment = '(anonymous)';
          }
          try {
            t.comment(comment);
            testBlock(t);
          } catch(e) {
            t.fail(e);
          }
        };
        cb(t);
      })
    };
  })(tape);
  // should hijack setTimeout before pass to sandbox
  const clock = sinon.useFakeTimers();
  const sandbox = {
    setTimeout: window.setTimeout, // need to be passed also...
    console,
    sinon,
    test,
    clock,
    spy
  };

  const script = new vm.Script(code);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  clock.restore();
}
const debouncedRunCode = _.debounce(runCode, 200);

const QuestionSelector = ({ handleSelected, activeIndex }) => {
  const items = questions.map((q, i) => {
    return <MenuItem key={i} value={i} primaryText={q.name} />;
  });

  return (
    <DropDownMenu value={activeIndex} onChange={(e, i) => handleSelected(i)}>
      {items}
    </DropDownMenu>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.testsRef = null;

    this.state = { SyntaxError : '' } ;
    this.handleSelected = this.handleSelected.bind(this);
    this.handleCodeChange = _.debounce(this.handleCodeChange.bind(this), 800);

    this.actions = this.props.actions ;
    this.resetQuestion = this.actions.resetQuestion ;
    this.changeQuestion = this.actions.changeQuestion ;
    this.changeCode = this.actions.changeCode ;
    this.changeSyntaxError = this.actions.changeSyntaxError ;
  }

  componentDidMount() {
    const { rawCode } = this.props ;
    this.handleCodeChange(rawCode) ;
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
        <CodeMirror
          onChange={this.handleCodeChange}
          options={{
            mode: 'javascript',
            lineNumbers: true,
            autoCloseBrackets: true
          }}
          value={rawCode}
        />
        <div>
          <div className="additional-info">
            <QuestionSelector
              handleSelected={this.handleSelected}
              activeIndex={index}
            />
            <button onClick={this.resetQuestion}>Reset</button>
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

export default connect(
  state => {
    const { code : codeObj } = state ;
    const { index } = codeObj ;
    const compiledCode = codeObj.compiledCode ;
    const rawCode = ( codeObj[index] && codeObj[index].code ) || questions[index].content ;
    return {
      rawCode ,
      compiledCode ,
      index
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
)(App);
