import React, { Component } from "react";
import QuestionContent from "./questionContent";

class QuistiosnList extends Component {
	removeQuestion = (e) => {
		const questionNodeid = e.target.parentNode.id;
		const btn = document.getElementById(questionNodeid);
		btn.style.display = "none";
	};
	render() {
		const { questions } = this.props;
		const list = [];

		if (questions && questions !== 0) {
			for (let i = 1; i <= questions; i++) {
				list.push(
					<div key={i} id={`${"question" + i}`}>
						<i
							className="material-icons remove-q"
							onClick={this.removeQuestion}
						>
							remove_circle
						</i>
						<div style={{ marginRight: 20 + "px", marginTop: -26 + "px" }}>
							Question {i}{" "}
						</div>

						<QuestionContent />
					</div>
				);
			}

			return <div className="project-list section">{list}</div>;
		}
		return null;
	}
}

export default QuistiosnList;
