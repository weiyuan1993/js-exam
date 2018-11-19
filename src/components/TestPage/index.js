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
import { Auth } from 'aws-amplify';

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
  // alert(JSON.stringify(result));
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

const createAuthedModelForOwner = async () => {
  console.log('add AuthedModelForOwner');
  const params = {
    input: {
      content: 'AuthedModelForOwner content ' + (new Date().toISOString()),
    }
  };
  const createAuthedModelForOwnerOp = `mutation CreateAuthedModelForOwner($input: CreateAuthedModelForOwnerInput!) {
    createAuthedModelForOwner(input: $input) {
      id
      content
    }
  }`;
  const result = await API.graphql(graphqlOperation(createAuthedModelForOwnerOp, params));
  alert(JSON.stringify(result));
};

const TestBar = () => {
  return (
    <div>
      <button type="button" onClick={listRooms}>listRooms</button>
      <button type="button" onClick={listQuestions}>listQuestions</button>
      <button type="button" onClick={createRoom}>createRoom</button>
      <button type="button" onClick={createQuestion}>createQuestion</button>
      <button type="button" onClick={createAuthedModelForOwner}>createAuthedModelForOwner</button>
    </div>
  );
};

let cognitoUser;
//cognito
// const username="jackieaws2018";
// const username = "Subject_1542079447498";
const username = "Subject_1542080684558";
const password="Innova@p3";
const signIn = async () => {
  Auth.signIn(username, password)
  .then(user => {
    console.log('#user', user);
    cognitoUser = user;
  })
  .catch(err => console.log(err));
};
const signout = async () => {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));
};
const signup = async () => {
  const username="Subject_"+(new Date).getTime();
  const password="Innova@p3";  
  const email = 'jackie@test.com';
  Auth.signUp({
    username,
    password,
    attributes: {
      email,          // optional
      // phone_number,   // optional - E.164 number convention
      // other custom attributes 
    },
    validationData: []  //optional
  })
    .then(data => console.log('#signup', data))
    .catch(err => console.log(err));
};
//this code should be used after admin logged in
const signupAdmin = async () => {
  const username = "Subject_" + (new Date).getTime();
  const password = "Innova@p3";
  const email = 'jackie@admin.com';
  console.log('#signupAdmin', Auth);
  Auth.signUp({
    username,
    password,
    attributes: {
      email,          // optional
      // phone_number,   // optional - E.164 number convention
      // other custom attributes 
      'custom:role': 'admin'
    },
    validationData: []  //optional
  })
    .then(data => console.log('#signup admin', data))
    .catch(err => console.log(err));
};
const getSession = () => {
  if (cognitoUser != null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err);
        return;
      }
      console.log('session: ' + JSON.stringify(session));
      console.log('session validity: ' + session.isValid());
      window.cognitoSession = session;
    });
  }
};
const CognitoBar = () => {
  return (
    <div>
      <button type="button" onClick={signIn}>signIn</button>
      <button type="button" onClick={signout}>signout</button>
      <button type="button" onClick={signup}>signup</button>
      <button type="button" onClick={signupAdmin}>signupAdmin</button>
      <button type="button" onClick={getSession}>getSession</button>
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
        <CognitoBar></CognitoBar>
        {/* <div><RoomList></RoomList></div> */}
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
