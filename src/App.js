import React, { Component } from "react";
import { connect } from "react-redux";
import vm from "vm";
import { transform } from "buble";
import sinon from "sinon";

import CodeMirror from "react-codemirror";

import { changeCode } from "./actions/code";
import "./App.css";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import questionList from "./utils/questions";

function spy(obj, methodName)  {
  const origFn = obj[methodName];
  let callCount = 0;
  let calledWith = [];
  obj[methodName] = (...args) => {
    const result = origFn.apply(obj, args);
    callCount++;
    calledWith.push(args.join('JENO'));
    return result;
  };
  return {
    calledWith: (...args) => calledWith.indexOf(args.join('JENO')) >= 0,
    callCount: () => callCount,
    restore: () => (obj[methodName] = origFn),
  };
}

function runCode(code) {
  delete require.cache[require.resolve("tape")];
  const tape = require("tape");
  require("tape-dom")(tape);
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

    this.state = {
      activeIndex: 0,
      code: questionList[0].content
    };

    this.handleSelected = this.handleSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Jeno is our god
    if (this.testsRef) {
      this.testsRef.innerHTML = "";
      runCode(nextProps.code);
    }
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

    return (
      <div className="App">
        <CodeMirror
          onChange={newCode => {
            try {
              const { code } = transform(newCode);
              props.actions.changeCode(code);
              this.setState({ code: newCode, syntaxError: "" });
            } catch (e) {
              if (e.loc) {
                const { line, column } = e.loc;
                this.setState({
                  syntaxError: `Syntax error: line ${line}, column ${column}`
                });
              }
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
