import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  resetConsole
} from '../../actions/console';
import './Console.css';

class Console extends Component {
  constructor(props) {
    super(props);
    this.resetConsole = this.props.resetConsole;
  }
  render() {
    return (
      <div>
        Console:
        {
          this.props.console.map(({ args }, index1) => 
            <div className="console" key={index1}>
              {
                args.map((text, index2) => <div className="text" key={index2}>{ `${text}`.trim() === '' ? <br/> : `${text}`.trim() }</div> )
              }
            </div> )
        }
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      console: state.console
    };
  },
  dispatch => {
    return {
      resetConsole: () => dispatch(resetConsole())
    };
  }
)(Console);

