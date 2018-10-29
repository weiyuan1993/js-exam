import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultPanel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className ? this.props.className : ''} id="result">
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      code: state.code.compiledCode
    };
  },
  dispatch => {
    return {
    };
  }
)(ResultPanel);

