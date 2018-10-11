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

import { changeCode } from '../actions/code';
import './RecordPage.css';
import debouncedRunCode from '../utils/runCode';



class RecordPage extends Component {
  constructor(props) {
    super(props);

    this.testsRef = null;
    this.timerId = null;
    this.state = { rawCode : '' } ;

    this.actions = this.props.actions ;
    this.resetQuestion = this.actions.resetQuestion ;
    this.changeQuestion = this.actions.changeQuestion ;
    this.changeCode = this.actions.changeCode ;
    this.changeSyntaxError = this.actions.changeSyntaxError ;
		this.readFile = this.readFile.bind(this);
  }

  componentDidMount() {
    // if (!this.props.isLogin) {
    //   this.props.history.push('/js-exam/login');
    //   return;
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

	readFile(file) {
		console.log(file);
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
			const codes = fileReader.result.split('\n$$$$$$$$$$$$$$$$$$$$$$$\n');
			let index = 0;
			let timerId = setInterval(() => {
				this.setState({ rawCode: codes[index] });
				index ++;
				if (index >= codes.length) {
					clearInterval(timerId);
				}
			}, 100);
		}
		fileReader.readAsText(file);
	}

  render() {
    const { rawCode } = this.state ;
    return (
      <div className="App">
        <AceEditor
          mode="javascript"
          theme="textmate"
          value={rawCode}
        />
				<input
					type="file"
					onChange={(e) => this.readFile(e.target.files[0])}
				></input>
      </div>
    );
  }
}

export default withRouter(connect(
  state => {
    const { code : codeObj } = state ;
    const { index } = codeObj ;
    const compiledCode = codeObj.compiledCode ;
    const rawCode = '' ;
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
        changeCode: (args) => dispatch(changeCode(args))
      }
    };
  }
)(RecordPage));
