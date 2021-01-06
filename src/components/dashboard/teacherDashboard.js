import React, { Component } from "react";
import QuizesList from "../quiz/quizesList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Icon, Autocomplete } from "react-materialize";

class TeacherDashboard extends Component {
	state = {
		searchTerm: "",
		searchResult: [],
	};
	handleChange = (e) => {
		const { quizes, isLoaded } = this.props;
		const { searchTerm } = this.state;
		this.setState({
			[e.target.id]: e.target.value,
		});

		if (isLoaded) {
			const results = quizes.filter(function (quiz) {
				return quiz.quizTitle.toLowerCase().includes(searchTerm);
			});
			this.setState({
				searchResult: results,
			});
		}
	};

	render() {
		const { quizes, auth, isLoaded } = this.props;
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
											placeholder="Search For Quizes"
										/>
									</div>
								</div>
								<QuizesList
									quizes={
										this.state.searchTerm === ""
											? quizes
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
		quizes: state.firestore.ordered.quizes,
		auth: state.firebase.auth,
		isLoaded: state.firebase.profile.isLoaded,
	};
};

export default compose(
	firestoreConnect([{ collection: "quizes" }]),
	connect(mapStateToProps)
)(TeacherDashboard);
