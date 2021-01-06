const initState = {
	numOfQues: 0,
	score: 0,
	passingScore: 0,
	quizTitle: "",
	questions: [],
	Err: "",
};

const quizReducer = (state = initState, action) => {
	switch (action.type) {
		case "SAVE_QUESTION_SUCCESS":
			return {
				...state,
				questions: state.questions.concat(action.question),
			};

		case "SAVE_QUESTION_ERROR":
			return {
				...state,
				Err: action.error,
			};
		case "CREATE_QUIZ_SUCCESS":
			return state;

		case "CREATE_QUIZ_ERROR":
			return {
				...state,
				Err: action.error,
			};

		case "SEARCH_QUIZES_SUCCESS":
			console.log("search", action.quiz);
			return {
				...state,
				quizes: action.quiz,
			};
		case "SEARCH_QUIZ_FAIL":
			return {
				...state,
				Err: action.msg,
			};
		case "DELETE_QUIZ_SUCCESS":
			return {
				...state,
				quizes: action.quizes,
			};
		case "DELETE_QUIZ_FAIL":
			return {
				...state,
				Err: action.err,
			};
		default:
			return state;
	}
};

export default quizReducer;
