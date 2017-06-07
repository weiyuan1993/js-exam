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
    logs: [],
    console: {
      log: (s) => {
        context.logs.push(s);
      }
    },
    expect,
    Mocha,
    mocha,
    describe,
    it
  };
  const script = new vm.Script(code);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
}

class App extends Component {
  render () {
    let mochaRef;
    if(mochaRef) {
      console.log('should clean');
      mochaRef.innerHTML = '';
    }
    const props = this.props;
    runCode(props.code);

    return (
      <div className="App">
        <div className="editor">
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
        </div>
        <div id='mocha' ref={ref => {
          console.log('ref');
          mochaRef = ref;
        }}/>
      </div>
    );
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
