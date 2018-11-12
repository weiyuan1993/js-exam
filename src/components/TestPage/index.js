import React, { Component } from 'react';
//simpe ui compoents
import RoomList from './roomList.js';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import awsExportConfig from '../../aws-exports.js'; 

import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';

// import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsExportConfig);



const listRooms = async () => {
  console.log('listing room');
  const listRoomsOp = `query ListRooms {
    listRooms{
      items{
        id
      }
    }
  }`;
  const result = await API.graphql(graphqlOperation(listRoomsOp));
  alert(JSON.stringify(result));
};

const listQuestions = async () => {
  console.log('listing room');
  const listQuestionsOp = `query ListQuestions {
    listQuestions {
      items{
        id
        name
        content
        test
      }
    }
  }`;
  const result = await API.graphql(graphqlOperation(listQuestionsOp));
  alert(JSON.stringify(result));
};

const createRoom = async () => {
  console.log('add room');
  const params = {
    input: {
      description: 'room ' + (new Date().toISOString())
    }
  };
  const createRoomOp = `mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      description
    }
  }`;
  const result = await API.graphql(graphqlOperation(createRoomOp, params));
  alert(JSON.stringify(result));
};

const createQuestion = async () => {
  console.log('add question');
  const params = {
    input: {
      name: 'question name ' + (new Date().toISOString()),
      content: 'question content ' + (new Date().toISOString()),
      test: 'question test ' + (new Date().toISOString())
    }
  };
  const createQuestionOp = `mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      name
      content
      test
    }
  }`;
  const result = await API.graphql(graphqlOperation(createQuestionOp, params));
  alert(JSON.stringify(result));
};

const TestBar = () => {
  return (
    <div>
      <button type="button" onClick={listRooms}>listRooms</button>
      <button type="button" onClick={listQuestions}>listQuestions</button>
      <button type="button" onClick={createRoom}>createRoom</button>
      <button type="button" onClick={createQuestion}>createQuestion</button>
    </div>
  );
};

class TestPage extends Component {
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

  render() {
    return (
      <div>
        <TestBar></TestBar>
        <div><RoomList></RoomList></div>
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
)(TestPage));
