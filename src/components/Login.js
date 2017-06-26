import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import * as firebase from "firebase";

const Login = ({ firebaseApp }) => {
  const signUpCallback = () => {
    var provider = new firebase.auth.GoogleAuthProvider(); //GithubAuthProvider
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    /*
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
    });
    */
  };
  return (
    <div>
      <RaisedButton
        onTouchTap={() => signUpCallback()}
        label="Sign in with Google"
        secondary
        icon={<FontIcon className="fa fa-google" />}
      />
      <RaisedButton
        label="Sign in with Github"
        primary
        icon={<FontIcon className="fa fa-github" />}
      />
    </div>
  );
};

export default Login;
