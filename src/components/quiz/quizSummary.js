import React from "react";

const QuizSummary = ({ quiz }) => {
	return (
		<div className="card z-depth-0 project-summary">
			<div className="card-content purple-text text-darken-3">
				<span className="card-title">
					<span className="card-title">{quiz.quizTitle}</span>
				</span>
			</div>
		</div>
	);
};

export default QuizSummary;
