export const createQuiz = (quiz) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to db

		//firestore reference
		const fireStoreRef = getFirestore();
		const adminId = getState().firebase.auth.uid;

		//add functionality
		fireStoreRef
			.collection("quizes")
			.add({
				...quiz,
				adminId: adminId,
			})
			.then(() => {
				dispatch({
					type: "CREATE_QUIZ_SUCCESS",
					quiz,
				});
			})
			.catch((err) => {
				dispatch({ type: "CREATE_QUIZ_ERROR", error: err });
			});
	};
};
export const saveQuestion = (question) => {
	return (dispatch) => {
		if (question && question.length !== 0) {
			// console.log(question);
			dispatch({ type: "SAVE_QUESTION_SUCCESS", question: question });
		} else {
			dispatch({ type: "SAVE_QUESTION_ERROR", error: "something went wrong" });
		}
	};
};

export const deleteQuiz = (quizId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const fireStoreRef = getFirestore();

		const quizes = getState().firestore.data.quizes;
		fireStoreRef
			.collection("quizes")
			.doc(quizId)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_QUIZ_SUCCESS", quizes });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_QUIZ_ERROR", error: err });
			});
	};
};

export const searchQuiz = (searchTerm) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// const fireStoreRef = getFirestore();

		var quizes = getState().firestore.ordered.quizes;
		console.log(quizes);
		const quizesArray = Object.keys(quizes).map((i) => quizes[i]);
		const results = quizesArray.filter(function (quiz) {
			return quiz.quizTitle.toLowerCase().includes(searchTerm);
		});

		if (results) {
			quizes = results;
			console.log(quizes);
			dispatch({ type: "SEARCH_QUIZ_SUCCESS", quizes });
		}

		dispatch({ type: "SEARCH_QUIZ_FAIL", msg: "no quiz found" });
	};
};
