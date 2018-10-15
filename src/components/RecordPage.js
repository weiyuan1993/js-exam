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
import moment from 'moment';

import { changeCode } from '../actions/code';
import './RecordPage.css';
import debouncedRunCode from '../utils/runCode';



class RecordPage extends Component {
  constructor(props) {
    super(props);

    this.testsRef = null;
    this.timerId = null;
    this.state = { rawCode : '', frameAmount: 0, frame: 0, isPlaying: false } ;
    this.codes = [];
    this.speed = 100;

    this.actions = this.props.actions ;
    this.readFile = this.readFile.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeCode = this.changeCode.bind(this);
    this.play = this.play.bind(this);
    this.changeFrame = this.changeFrame.bind(this);
  }

  componentDidMount() {
    // if (!this.props.isLogin) {
    //   this.props.history.push('/js-exam/login');
    //   return;
    // }
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  changeCode () {
    clearTimeout(this.timerId);
    this.setState({ rawCode: this.codes[this.state.frame] });
    if (!this.state.isPlaying) return;
    if (this.state.frame < this.codes.length) {
      this.setState({ frame: this.state.frame + 1 });
      this.timerId = setTimeout(this.changeCode, this.speed);
    } else {
      this.setState({ isPlaying: false });
    }
  }

	readFile(file) {
		const fileReader = new FileReader();
		fileReader.onloadend = () => {
      this.codes = fileReader.result.split('\n$$$$$$$$$$$$$$$$$$$$$$$\n');
      this.setState({ frameAmount: this.codes.length });
      this.changeCode();
		}
		fileReader.readAsText(file);
  }
  
  changeSpeed(times) {
    this.speed *= times;
  }

  changeFrame(index) {
    this.setState({ frame: parseInt(index, 10) }, this.changeCode);
    this.changeCode();
  }

  play(value) {
    this.setState({ isPlaying: value }, this.changeCode);
  }

  render() {
    const { rawCode, frameAmount, frame, isPlaying } = this.state ;
    console.log(frame);
    console.log(frameAmount);
    return (
      <div className="App">
        <AceEditor
          mode="javascript"
          theme="textmate"
          value={rawCode}
        />
        <div>
          <input
            type="file"
            onChange={(e) => this.readFile(e.target.files[0])}
          >
          </input>
          <Button variant="outlined" onClick={() => this.changeSpeed(2)}>-</Button>
          <Button variant="outlined" onClick={() => this.changeSpeed(0.5)}>+</Button>
          <Button
            variant="outlined"
            onClick={() => this.play(!isPlaying)}
          >
            { isPlaying ? 'Stop' : 'Play' }
          </Button>
          <input type="range" min="0" max={frameAmount} onChange={(e) => this.changeFrame(e.target.value)} value={frame}></input>
          <div>{moment.utc(frame * 100).format('HH:mm:ss')}/{moment.utc(frameAmount * 100).format('HH:mm:ss')}</div>
        </div>
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
      }
    };
  }
)(RecordPage));
