export const createStudent = (student) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//make async call to db

		//firestore reference
		const fireStoreRef = getFirestore();
		const adminId = getState().firebase.auth.uid;

		//add functionality
		fireStoreRef
			.collection("students")
			.add({
				...student,
				createdAt: new Date(),
				adminId: adminId,
			})
			.then(() => {
				dispatch({
					type: "ADD_STUDENT",
					student,
				});
			})
			.catch((err) => {
				dispatch({ type: "ADD_STUDENT_ERROR", error: err });
			});
	};
};

export const searchStudent = (searchTerm) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// const fireStoreRef = getFirestore();

		var students = getState().firestore.ordered.students;
		console.log(students);
		const studentsArray = Object.keys(students).map((i) => students[i]);
		const results = studentsArray.filter(function (student) {
			return student.email.toLowerCase().includes(searchTerm);
		});

		if (results) {
			students = results;
			console.log(students);
			dispatch({ type: "SEARCH_STUDENT_SUCCESS", students });
		}

		dispatch({ type: "SEARCH_STUDENTS_FAIL", msg: "no students found" });
	};
};

export const deleteStudent = (studentId) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const fireStoreRef = getFirestore();
		// const authorId = getState().firebase.auth.uid;
		const students = getState().firestore.data.students;

		fireStoreRef
			.collection("students")
			.doc(studentId)
			.delete()
			.then(() => {
				dispatch({ type: "DELETE_PROJECT_SUCCESS", students });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_PROJECT_ERROR", error: err });
			});
	};
};

export const editStudent = (studentId, student) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const fireStoreRef = getFirestore();
		const students = getState().firestore.data.students;

		fireStoreRef
			.collection("students")
			.doc(studentId)
			.update({
				email: student.email,
				score: student.score,
				name: student.name,
			})
			.then(() => {
				dispatch({ type: "EDIT_STUDENT_SUCCESS", students });
			})
			.catch((error) => {
				dispatch({ type: "EDIT_STUDENT_ERROR", error });
			});
	};
};
