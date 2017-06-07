import React from 'react';
import { connect } from 'react-redux';

import CodeMirror from 'react-codemirror';

import { changeCode } from './actions/code';
import './App.css';

let App = (props) => {
  return (
    <div className="App">
      <div className="editor">
        <CodeMirror
          onChange={props.actions.changeCode}
          options={{
            mode: 'javascript',
            lineNumbers: true,
            autoCloseBrackets: true,
          }} />
      </div>
      <div className="result" />
      <div>{props.code}</div>
    </div>
  );
};


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
