import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsList from "./questionsList";
import { createQuiz } from "../../store/actions/quizActions";
import { Redirect, Link } from "react-router-dom";

class CreateQuiz extends Component {
	state = {
		quizTitle: "",
		score: 0,
		passingScore: 0,
		numOfQues: 0,
		buttonClicked: false,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { quizTitle, score, passingScore, numOfQues } = this.state;
		const { questions } = this.props;
		this.props.createQuiz({
			quizTitle,
			score,
			passingScore,
			numOfQues,
			questions,
		});
		console.log("ques", questions);
		this.props.history.push("/");
	};

	updateContent = (e) => {
		e.preventDefault();
		this.setState({
			buttonClicked: true,
			numOfQues: this.state.numOfQues + 1,
		});
	};
	render() {
		const { auth } = this.props;
		const { numOfQues } = this.state;
		if (!auth.uid) return <Redirect to="/signin" />;

		return (
			<div className="container">
				<div className="card row">
					<form onSubmit={this.handleSubmit} className="card-content row">
						<h5 className="purple-text text-darken-3">Create quiz</h5>
						<div className="input-field"></div>
						<label htmlFor="title">Quiz Title</label>
						<input
							className="validate"
							required={true}
							aria-required="true"
							type="text"
							name=""
							id="quizTitle"
							onChange={this.handleChange}
						/>
						<div className="input-field"></div>
						<label htmlFor="title">Quiz Score</label>
						<input
							className="validate"
							required={true}
							aria-required="true"
							type="number"
							name=""
							id="score"
							onChange={this.handleChange}
						/>
						<div className="input-field"></div>
						<label htmlFor="title">Passing Score</label>
						<input
							className="validate"
							required={true}
							aria-required="true"
							type="number"
							name=""
							id="passingScore"
							onChange={this.handleChange}
						/>
						<div className="input-field"></div>

						{this.state.buttonClicked ? (
							<QuestionsList questions={numOfQues} />
						) : null}
						<div className="text-center" style={{ marginLeft: 124 + "px" }}>
							<div className="btn btn-secondary" onClick={this.updateContent}>
								Add New Question
							</div>
						</div>

						<div className="input-field center">
							<button
								className="btn purple lighten-1 z-depth-0 white-text center"
								style={{ marginRight: 75 + "px" }}
							>
								Save
							</button>
							<Link to="/" className="purple-text">
								<button className="btn grey darken-0">Cancel</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		createQuiz: (quiz) => dispatch(createQuiz(quiz)),
	};
};
const mapStateToProps = (state) => {
	// console.log(state);
	return {
		auth: state.firebase.auth,
		questions: state.quiz.questions,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateQuiz);
