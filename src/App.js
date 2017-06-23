import React, { Component } from "react";
import { connect } from "react-redux";
import vm from "vm";
import { transform } from "buble";

import CodeMirror from "react-codemirror";

import { changeCode } from "./actions/code";
import "./App.css";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import questionList from "./utils/questions";

function runCode(code) {
  delete require.cache[require.resolve("tape")];
  const tape = require("tape");
  require("tape-dom")(tape);
  const sandbox = {
    console,
    test: tape
  };
  const script = new vm.Script(code);
  const context = new vm.createContext(sandbox);
  script.runInContext(context);
}
const QuestionSelector = ({ handleSelected, activeIndex }) => {
  const items = questionList.map((q, i) => {
    return <MenuItem key={i} value={i} primaryText={q.name} />;
  });

  return (
    <DropDownMenu
      value={activeIndex}
      onChange={(e, i) => handleSelected(i)}
    >
      {items}
    </DropDownMenu>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.testsRef = null;

    this.state = {
      activeIndex: 0,
      code: questionList[0].content
    };

    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(index) {
    const code = questionList[index].content;
    this.setState({
      activeIndex: index,
      code
    });
  }

  render() {
    const props = this.props;

    if (this.testsRef) {
      this.testsRef.innerHTML = "";
      runCode(props.code);
    }

    return (
      <div className="App">
        <CodeMirror
          onChange={newCode => {
            try {
              const { code } = transform(newCode);
              props.actions.changeCode(code);
              this.setState({ code: newCode, syntaxError: "" });
            } catch (e) {
              const { line, column } = e.loc;
              this.setState({
                syntaxError: `Syntax error: line ${line}, column ${column}`
              });
            }
          }}
          options={{
            mode: "javascript",
            lineNumbers: true,
            autoCloseBrackets: true
          }}
          value={this.state.code}
        />
        <div>
          <div className="additional-info">
            <QuestionSelector
              handleSelected={this.handleSelected}
              activeIndex={this.state.activeIndex}
            />
            {!this.state.syntaxError
              ? null
              : <div className="syntax-error">
                  {this.state.syntaxError}
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
    return {
      code: state.code
    };
  },
  dispatch => {
    return {
      actions: {
        changeCode: newCode => dispatch(changeCode(newCode))
      }
    };
  }
)(App);
