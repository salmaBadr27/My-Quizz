import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import { Modal, Button } from "react-materialize";
import { deleteQuiz } from "../../store/actions/quizActions";

class QuizDetails extends Component {
	handleDeleteQuiz = () => {
		const quizId = this.props.quizId;
		this.props.deleteQuiz(quizId);
		this.props.history.push("/");
	};

	render() {
		const { quiz, auth } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;
		if (quiz) {
			const questions = quiz.questions;
			return (
				<div className="container section project-details">
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title purple-text">{quiz.quizTitle}</span>
							<p>Score : {quiz.score}.</p>
							<p>Passing Score : {quiz.passingScore} .</p>
							<p>Number Of questions : {quiz.questions.length} .</p>
							<span>
								{questions.map(function (question, index) {
									return (
										<div key={index}>
											<div> Question Title : {question.quesTitle}</div>
											<span>Options</span>

											<div>a : {question.answer1}</div>
											<div>b : {question.answer2}</div>
											<div>c : {question.answer3}</div>
											<div>d : {question.answer4}</div>
											<div>Corect Answer : {question.correctAnswer}</div>
										</div>
									);
								})}
							</span>
						</div>
						<div className="card-action">
							<Link to="/" className="purple-text">
								<button className="btn grey darken-4">back</button>
							</Link>

							<Button
								className="btn red darken-4 modal-trigger"
								href="#modal1"
								node="button"
								disabled={quiz.adminId !== auth.uid ? true : false}
							>
								Delete
							</Button>
							<Modal
								actions={[
									<Button
										className="btn red darken-4"
										node="button"
										waves="red"
										onClick={this.handleDeleteQuiz}
									>
										Delete
									</Button>,
									<Button flat modal="close" node="button">
										Cancle
									</Button>,
								]}
								bottomSheet={false}
								fixedFooter={false}
								header="Delete Quiz"
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
								Are You Sure You Want To Delete This Quiz ?
							</Modal>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="container center">
					<p>Loading Quiz...</p>
				</div>
			);
		}
	}
}

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const quizes = state.firestore.data.quizes;

	const quiz = quizes ? quizes[id] : null;
	return {
		quiz: quiz,
		auth: state.firebase.auth,
		quizId: id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteQuiz: (quizId) => dispatch(deleteQuiz(quizId)),
	};
};

export default compose(
	firestoreConnect([{ collection: "quizes" }]), // or { collection: 'todos' }
	connect(mapStateToProps, mapDispatchToProps)
)(QuizDetails);
