import _ from 'underscore';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import vm from 'vm';
import { transform } from 'buble';
import sinon from 'sinon';

import CodeMirror from 'react-codemirror';

import { changeCode ,changeQuestion , changeSyntaxError } from './actions/code';
import './App.css';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import questionList from './utils/questions';

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
  // should hijack setTimeout before pass to sandbox
  const clock = sinon.useFakeTimers();
  const sandbox = {
    setTimeout: window.setTimeout, // need to be passed also...
    console,
    sinon,
    test: tape,
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
  const items = questionList.map((q, i) => {
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
    this.handleCodeChange = _.debounce(this.handleCodeChange.bind(this), 300);

    this.actions = this.props.actions ;
    this.changeQuestion = this.actions.changeQuestion ;
    this.changeCode = this.actions.changeCode ;
    this.changeSyntaxError = this.actions.changeSyntaxError ;
  }

  componentDidMount() {
    const { rawCode } = this.props ;
    this.handleCodeChange(rawCode) ;
  }

  componentWillUpdate(nextProps, nextState) {
    const { compiledCode , index , rawCode } = nextProps ;
    if (this.testsRef) {
      this.testsRef.innerHTML = '';
      debouncedRunCode(compiledCode);
    }
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.index !== nextProps.index ){
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
    const rawCode = ( codeObj[index] && codeObj[index].code ) || questionList[index].content ;
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
        changeSyntaxError: error => dispatch(changeSyntaxError(error)) ,
      } 
    };
  }
)(App);
