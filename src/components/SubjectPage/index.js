import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transform } from 'buble';
// import 'brace';
// import 'brace/mode/javascript';
// import 'brace/theme/textmate';
// import 'brace/theme/monokai';
import AceEditor from 'react-ace';
import { withRouter } from 'react-router-dom';
// import { Button } from 'antd';

import QuestionList from './QuestionList';
import QuestionEditor from './QuestionEditor';

import './page.css';

// import questions from '../../questions';

import {
  changeQuestion,
  updateQuestionList
} from '../../actions/questionDispatch';

import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';

import awsExportConfig from '../../aws-exports.js'; 

import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

class MainPage extends Component {
  constructor(props) {
    super(props);
    

    this.updateQuestionList = this.props.actions.updateQuestionList;
    this.changeQuestion = this.props.actions.changeQuestion;


  }
  
  async listQuestions() {
    console.log('###listing room');
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
    console.log("#listQuestions", JSON.stringify(result));
    this.updateQuestionList(result.data.listQuestions.items);
  };

  async getRoom() {
    console.log('get room');
    const params = {
      id: "demoRoom1"
    };
    const getRoomOp = `query GetRoom($id: ID!) {
      getRoom(id: $id) {
        id
        subjectId
        description
        progress
        questionSource {
          items {
            id
            name
            content
            test
          }
        }
      }
    }`;
    const result = await API.graphql(graphqlOperation(getRoomOp, params));
    console.log("#getRoom", result);
    let questionSource = result.data.getRoom.questionSource.items;
    this.changeQuestion({ id: questionSource[0].id, question: questionSource[0] });
    // console.log(JSON.stringify(result));
  };

  subscribeOnUpdateRoom() {
    console.log('updateQuestionSnapshot');
    // const result = await API.graphql(graphqlOperation(subscriptions.onUpdateRoom));

    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateRoom)
    ).subscribe({
      next: (result) => {
        if (result) {

        }
        console.log("#subscribeOnUpdateRoom", result);
      }
    });

    // Stop receiving data updates from the subscription
    // subscription.unsubscribe();


  };


  subscribeOnCreateQuestionSnapshot() {
    console.log('subscribeOnCreateQuestionSnapshot');
    // const result = await API.graphql(graphqlOperation(subscriptions.onUpdateRoom));

    // Subscribe to creation of Todo
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateQuestionSnapshot)
    ).subscribe({
      next: (result) => {
        if (result) {

        }
        console.log("#subscribeOnCreateQuestionSnapshot", result);
        let questionSnapshot = result.value.data.onCreateQuestionSnapshot;
        this.changeQuestion({ id: questionSnapshot.id, question: questionSnapshot });
      }
    });

    // Stop receiving data updates from the subscription
    // subscription.unsubscribe();


  };

  componentDidMount() {
    this.getRoom();
    this.subscribeOnUpdateRoom();
    this.subscribeOnCreateQuestionSnapshot();
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentWillReceiveProps(nextProps){

  }

  render() {
    console.log("### render ", this.props)
    return (
      // <div>admin dispatch</div>
      <span className="questionEditor-container">
        <div className="subject-questionEditor-panel-right">
          <QuestionEditor></QuestionEditor>
        </div>        
      </span>
    );
  }
}

export default withRouter(connect(
  state => {
    console.log("### listRows", state);
    let {questionDispatch} = state;
    console.log("### questionDispatch", questionDispatch);

    return {
      listRows: questionDispatch.questions || []
    };
  },
  dispatch => {
    return {
      actions: {
        // updateQuestionList: (questions) => dispatch(updateQuestionList(questions)),
        changeQuestion: index => dispatch(changeQuestion(index)),
      }
    };
  }
)(MainPage));
