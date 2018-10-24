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
          this.props.console.map(({ args }) => 
            <div className="console">
              {
                args.map((text) => <div className="text">{ `${text}`.trim() === '' ? <br/> : `${text}`.trim() }</div> )
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

