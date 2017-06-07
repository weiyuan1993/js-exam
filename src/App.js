import React, { Component } from 'react';

import CodeMirror from 'react-codemirror';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="editor">
          <CodeMirror options={{
            mode: 'javascript',
            lineNumbers: true,
          }} />
        </div>
        <div className="result" />
      </div>
    );
  }
}

export default App;
