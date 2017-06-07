/* globals Mocha,mocha,describe,it */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import vm from 'vm';
import { transform } from 'buble';
import Chai from 'chai';

import CodeMirror from 'react-codemirror';

import { changeCode } from './actions/code';
import './App.css';

const { expect } = Chai;

function runCode(code) {
  const sandbox = {
    console,
    expect,
    Mocha,
    mocha,
    describe,
    it
  };
  mocha.suite.suites = [];
  const script = new vm.Script(code);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
  mocha.run();
}
class App extends Component {
  constructor(props) {
    super(props);
    this.mochaRef = null;
  }

  render() {
    const props = this.props;

    if(this.mochaRef) {
      this.mochaRef.innerHTML = '';
      runCode(props.code);
    }

    return (<div className="App">
      <CodeMirror
        onChange={(newCode) => {
          try {
            const { code } = transform(newCode);
            props.actions.changeCode(code);
          } catch(e) {
          }
        }}
        options={{
          mode: 'javascript',
          lineNumbers: true,
          autoCloseBrackets: true,
        }} />
      <div id='mocha' ref={ref => this.mochaRef = ref} />
    </div>);
  }
}

export default connect(state => {
  return {
    code: state.code
  };
}, dispatch => {
  return {
    actions: {
      changeCode: newCode => dispatch(changeCode(newCode))
    }
  }
})(App);
