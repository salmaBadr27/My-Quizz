import React, { Component } from "react";
import { connect } from "react-redux";
import { saveQuestion } from "../../store/actions/quizActions";

class QuestionContent extends Component {
	state = {
		quesTitle: "",
		correctAnswer: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSave = (e) => {
		e.preventDefault();
		this.props.saveQuestion(this.state);
	};
	QuizOptions = () => {
		const answeres = [];
		for (let j = 1; j < 5; j++) {
			answeres.push(
				<div className="row" key={j}>
					<div className="col">
						<label htmlFor="title"> Answer {j}</label>
						<input
							onChange={this.handleChange}
							className="validate"
							required={true}
							aria-required="true"
							type="text"
							id={`${"answer" + j}`}
						/>
					</div>
				</div>
			);
		}
		return answeres;
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="input-field"></div>
					<label htmlFor="title"> Question Title</label>
					<input
						onChange={this.handleChange}
						className="validate"
						required={true}
						aria-required="true"
						type="text"
						id="quesTitle"
					/>
					<div className="input-field"></div>
					{this.QuizOptions()}
					<label htmlFor="title"> Correct Answer</label>
					<input
						onChange={this.handleChange}
						className="validate"
						required={true}
						aria-required="true"
						type="text"
						id="correctAnswer"
					/>
				</div>
				<button
					onClick={this.handleSave}
					className="btn purple lighten-1 z-depth-0 white-text center"
					style={{ marginRight: 75 + "px", width: 155 + "px" }}
				>
					Save question
				</button>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveQuestion: (question) => dispatch(saveQuestion(question)),
	};
};

export default connect(null, mapDispatchToProps)(QuestionContent);
