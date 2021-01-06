import React from "react";
import QuizSummary from "./quizSummary";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-materialize";

const QuizesList = ({ quizes }) => {
	return (
		<div className="project-list section">
			<Tabs className="tab-demo z-depth-1">
				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="All quizes"
				>
					{quizes && quizes.length !== 0 ? (
						quizes.map((quiz) => {
							// console.log(quiz);
							return (
								<Link to={"/quiz/" + quiz.id} key={quiz.id}>
									<QuizSummary quiz={quiz} />
								</Link>
							);
						})
					) : (
						<div className="card z-depth-0 project-summary">
							<div className="card-content purple-text text-darken-3">
								<span className="card-title">
									No Quizes Exist{" "}
									<span role="img" aria-label="sad">
										😢
									</span>
								</span>
							</div>
						</div>
					)}
				</Tab>
			</Tabs>
		</div>
	);
};

export default QuizesList;
