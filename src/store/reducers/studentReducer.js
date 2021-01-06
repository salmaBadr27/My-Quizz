const initState = {
	students: [],
	Err: "",
};

const studentReducer = (state = initState, action) => {
	switch (action.type) {
		case "ADD_STUDENT":
			return state;

		case "CREATE_STUDENT_ERROR":
			return state;

		case "SEARCH_STUDENT_SUCCESS":
			console.log("search", action.students);
			return {
				...state,
				students: action.students,
			};
		case "SEARCH_STUDENT_FAIL":
			return {
				...state,
				Err: action.msg,
			};
		default:
			return state;
	}
};

export default studentReducer;
