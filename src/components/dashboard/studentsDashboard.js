import React, { Component } from "react";
import StudentsList from "../students/studentsList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Icon, Autocomplete } from "react-materialize";

class Dashboard extends Component {
	state = {
		searchTerm: "",
		searchResult: [],
	};

	handleChange = (e) => {
		const { students, isLoaded } = this.props;
		const { searchTerm } = this.state;
		this.setState({
			[e.target.id]: e.target.value,
		});

		if (isLoaded) {
			const results = students.filter(function (student) {
				return student.email.toLowerCase().includes(searchTerm);
			});
			this.setState({
				searchResult: results,
			});
		}
	};

	render() {
		const { students, auth, isLoaded } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;
		if (isLoaded) {
			return (
				<div className="row">
					<div className="col s12 m12">
						<div className="row">
							<div className="col s12">
								<div className="row">
									<div className="input-field col s12">
										<Autocomplete
											value={this.state.searchTerm}
											onChange={this.handleChange}
											icon={<Icon>search</Icon>}
											id="searchTerm"
											placeholder="Search For Students"
										/>
									</div>
								</div>
								<StudentsList
									students={
										this.state.searchTerm === ""
											? students
											: this.state.searchResult
									}
									auth={auth}
								/>
							</div>
						</div>
					</div>
				</div>
			);
		}
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
const mapStateToProps = (state) => {
	return {
		students: state.firestore.ordered.students,
		auth: state.firebase.auth,
		isLoaded: state.firebase.profile.isLoaded,
	};
};

export default compose(
	firestoreConnect([
		{ collection: "students", orderBy: ["createdAt", "desc"] },
	]),
	connect(mapStateToProps)
)(Dashboard);
