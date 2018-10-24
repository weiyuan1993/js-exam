// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';

// firebase.initializeApp({
// 	apiKey: "AIzaSyBsRO7Mjdcu8bMYKGEmVJZotBUWxHe1Eoo",
// 	authDomain: "js-exam-d1de6.firebaseapp.com",
// 	databaseURL: "https://js-exam-d1de6.firebaseio.com",
// 	projectId: "js-exam-d1de6",
// 	storageBucket: "js-exam-d1de6.appspot.com",
// 	messagingSenderId: "35437196674"
// });

// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
// 	var errorMessage = error.message;
// 	console.log(error);
//   // ...
// });

// firebase.auth().onAuthStateChanged(function(user) {
// 	console.log(user);
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     // ...
//   } else {
//     // User is signed out.
//     // ...
//   }
//   // ...
// });

// const database = firebase.database();

// firebase.database().ref('users').set({
// 	username: 'abc'
// });