import "firebase/firestore";
import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
	apiKey: "AIzaSyD5Fe6g5DkgZTCU3WCE6iG3KdtMtllmU1g",
	authDomain: "my-quizz-e1ac2.firebaseapp.com",
	projectId: "my-quizz-e1ac2",
	storageBucket: "my-quizz-e1ac2.appspot.com",
	messagingSenderId: "832961372516",
	appId: "1:832961372516:web:1c8e4df489570219825a71",
	measurementId: "G-0N3ZEE5M23",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
