import React, { Component } from 'react';
//simpe ui compoents
import List from './List';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button } from 'antd';

// import awsExportConfig from '../../../aws-exports.js';

// import Amplify, {
//   API,
//   graphqlOperation
// } from 'aws-amplify';

// import * as subscriptions from '../../graphql/subscriptions';
// import { Auth } from 'aws-amplify';

// Amplify.configure(awsExportConfig);


class QuestionList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (!this.props.isLogin) {
    //   this.props.history.push('/js-exam/login');
    //   return;
    // }
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentWillReceiveProps(nextProps){
    // if ( this.props.index !== nextProps.index || nextProps.compiledCode === '' ){
    //   this.handleCodeChange(nextProps.rawCode) ;
    // }
  }

  dispatchQuestion() {

  }

  render() {
    return (
      <div>
        <Button type="info" onClick={this.dispatchQuestion}>Dispatch Question</Button>
        <List {...this.props}></List>
      </div>
    );
  }
}

export default withRouter(connect(
  state => {
    return {
    };
  },
  dispatch => {
    return {
      actions: {

      }
    };
  }
)(QuestionList));
