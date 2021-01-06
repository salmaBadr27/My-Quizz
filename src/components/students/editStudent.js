import React, { Component } from "react";
import create from "../img/create.png";
import { editStudent } from "../../store/actions/studentActions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class EditStudent extends Component {
	state = {
		email: this.props.isLoaded ? this.props.student.email : "",
		name: this.props.isLoaded ? this.props.student.name : "",
		score: this.props.isLoaded ? this.props.student.score : 0,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.editStudent(this.props.studentId, this.state);
		this.props.history.push("/students");
	};

	render() {
		const { auth, student, isLoaded } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;
		if (isLoaded)
			return (
				<div className="container">
					<div className="card row">
						<div className="col s12 m6">
							<form
								onSubmit={this.handleSubmit}
								className="card-content white "
							>
								<h5 className="purple-text text-darken-3">Edit Student</h5>
								<div className="input-field"></div>
								<label htmlFor="title">Email</label>
								<input
									required={true}
									aria-required="true"
									type="text"
									id="email"
									defaultValue={student.email}
									onChange={this.handleChange}
								/>
								<div className="input-field"></div>
								<label htmlFor="title">Name</label>
								<input
									required={true}
									aria-required="true"
									id="name"
									defaultValue={student.name}
									onChange={this.handleChange}
								/>
								<div className="input-field"></div>
								<label htmlFor="title">Score</label>
								<input
									required={true}
									aria-required="true"
									type="number"
									id="score"
									defaultValue={student.score}
									onChange={this.handleChange}
								/>

								<button
									onChange={this.handleSubmit}
									className="btn purple lighten-1 z-depth-0 white-text center"
								>
									Edit
								</button>
								<Link to="/students" className="purple-text">
									<button className="btn grey darken-0">Cancel</button>
								</Link>
							</form>
						</div>
						<div className="col s12 m5 center">
							<img
								className="materialboxed responsive-img"
								width="300"
								src={create}
								alt=""
							/>
						</div>
					</div>
				</div>
			);
		return (
			<div className="container loading">
				<div className="purple-text center-wrapper">
					<div className="progress">
						<div className="indeterminate"></div>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		editStudent: (id, student) => dispatch(editStudent(id, student)),
	};
};
const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const students = state.firestore.data.students;

	const student = students ? students[id] : null;
	return {
		student: student,
		auth: state.firebase.auth,
		studentId: id,
		isLoaded: state.firebase.profile.isLoaded,
	};
};
export default compose(
	firestoreConnect([{ collection: "students" }]), // or { collection: 'todos' }
	connect(mapStateToProps, mapDispatchToProps)
)(EditStudent);
