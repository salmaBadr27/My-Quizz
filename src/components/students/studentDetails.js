import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";
import { Modal, Button } from "react-materialize";
import { deleteStudent } from "../../store/actions/studentActions";

class StudentDetails extends Component {
	handleDeleteStudent = () => {
		const studentId = this.props.studentId;
		this.props.deleteStudent(studentId);
		this.props.history.push("/students");
	};

	render() {
		const { student, auth, studentId } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;
		if (student) {
			return (
				<div className="container section project-details">
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title purple-text">{student.name}</span>
							<p>Email : {student.email}</p>
							<p>Score : {student.score}.</p>
							<p>
								Passing Status : {student.pass_status ? "Passed" : "Failed"}.
							</p>
						</div>
						<div className="card-action grey lighten-4 purple-text">
							<div> {moment(student.createdAt.toDate()).calendar()}</div>
						</div>
						<div className="card-action">
							<Link to="/students" className="purple-text">
								<button className="btn grey darken-4">back</button>
							</Link>

							<Link to={`/edit-student/${studentId}`} className="purple-text">
								<button
									className="btn grey darken-0"
									disabled={student.adminId !== auth.uid ? true : false}
									node="button"
								>
									Edit
								</button>
							</Link>
							<Button
								className="btn red darken-4 modal-trigger"
								href="#modal1"
								node="button"
								disabled={student.adminId !== auth.uid ? true : false}
							>
								Delete
							</Button>
							<Modal
								actions={[
									<Button
										className="btn red darken-4"
										node="button"
										waves="red"
										onClick={this.handleDeleteStudent}
									>
										Delete
									</Button>,
									<Button flat modal="close" node="button">
										Cancle
									</Button>,
								]}
								bottomSheet={false}
								fixedFooter={false}
								header="Delete Student"
								id="modal1"
								open={false}
								options={{
									dismissible: true,
									endingTop: "10%",
									inDuration: 250,
									onCloseEnd: null,
									onCloseStart: null,
									onOpenEnd: null,
									onOpenStart: null,
									opacity: 0.5,
									outDuration: 250,
									preventScrolling: true,
									startingTop: "4%",
								}}
							>
								Are You Sure You Want To Delete This Student ?
							</Modal>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container center">
					<p>Loading Student...</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	// console.log(state);
	const id = ownProps.match.params.id;
	const students = state.firestore.data.students;

	const student = students ? students[id] : null;
	return {
		student: student,
		auth: state.firebase.auth,
		studentId: id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
	};
};

export default compose(
	firestoreConnect([{ collection: "students" }]), // or { collection: 'todos' }
	connect(mapStateToProps, mapDispatchToProps)
)(StudentDetails);
