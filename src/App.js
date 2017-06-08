import React, { Component } from 'react';
import { connect } from 'react-redux';
import vm from 'vm';
import { transform } from 'buble';

import CodeMirror from 'react-codemirror';

import { changeCode } from './actions/code';
import './App.css';
import questionList from './utils/questions';

function runCode(code) {
  delete require.cache[require.resolve('tape')]
  const tape = require('tape');
  require('tape-dom')(tape);
  const sandbox = {
    console,
    test: tape,
  };
  const script = new vm.Script(code);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
}
class App extends Component {
  constructor(props) {
    super(props);
    this.testsRef = null;
  }

  render() {
    const props = this.props;

    if(this.testsRef) {
      this.testsRef.innerHTML = '';
      runCode(props.code);
    }

    return (<div className="App">
      <CodeMirror
        defaultValue={questionList[0].content}
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
      <div id='tests' ref={ref => this.testsRef = ref} />
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
