import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginFirebase, logoutFirebase } from '../actions/firebase';
import Login from '../components/Login';

const authCheck = Comp => {
  class AuthCheck extends Component {
    componentWillMount() {
      const { firebase: { firebaseApp }, action } = this.props;
      firebaseApp.auth().onAuthStateChanged(function(user) {
        if (user) {
          action.login();
        } else {
          action.logout();
        }
      });
    }

    render() {
      const { firebase: { firebaseApp, isLogin } } = this.props;
      if (isLogin) {
        return <Comp />;
      } else {
        return <Login firebaseApp={firebaseApp} />;
      }
    }
  }

  return connect(
    state => {
      return {
        firebase: state.firebase
      };
    },
    dispatch => ({
      action: {
        login: () => dispatch(loginFirebase()),
        logout: () => dispatch(logoutFirebase())
      }
    })
  )(AuthCheck);
};

export default authCheck;