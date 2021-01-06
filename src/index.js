import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import {
	reduxFirestore,
	getFirestore,
	createFirestoreInstance,
} from "redux-firestore";
import {
	isLoaded,
	ReactReduxFirebaseProvider,
	getFirebase,
} from "react-redux-firebase";
import firebaseConfig from "./config/fbConfig";
import firebase from "firebase/app";

const store = createStore(
	rootReducer,

	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebase, firebaseConfig), // redux bindings for firestore and firebase
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

const reactReduxFirebaseProps = {
	dispatch: store.dispatch,
	config: {
		//project collection
		students: "students",
		//quiz collection
		quizes: "quizes",
		//users collection
		userProfile: "users",
		//Firestore for Profile instead of Realtime DB to sync of profile object to state
		useFirestoreForProfile: true,
	},
	firebase,
	createFirestoreInstance,
};

//to prevent dom rerendring until auth is ready
function AuthIsLoaded({ children }) {
	const auth = useSelector((state) => state.firebase.auth);
	if (!isLoaded(auth))
		return (
			<div className="container loading">
				<div className="purple-text center-wrapper">
					<div className="progress">
						<div className="indeterminate"></div>
					</div>
				</div>
			</div>
		);
	return children;
}

//react-redux-firebase property to pass to the provider so i can connect to firestore db and async data
ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...reactReduxFirebaseProps}>
			<AuthIsLoaded>
				<App />
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,

	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default store;
