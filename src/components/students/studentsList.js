import React from "react";
import StudentSummary from "./studentSummary";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-materialize";

const StudentsList = ({ students }) => {
	var failedStudents, passedStudents;
	if (students) {
		failedStudents = students.filter(function (student) {
			return student.pass_status === false;
		});
		passedStudents = students.filter(function (student) {
			return student.pass_status === true;
		});
	}
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
					title="All Student"
				>
					{students && students.length !== 0 ? (
						students.map((student) => {
							return (
								<Link to={"/student/" + student.id} key={student.id}>
									<StudentSummary student={student} />
								</Link>
							);
						})
					) : (
						<div className="card z-depth-0 project-summary">
							<div className="card-content purple-text text-darken-3">
								<span className="card-title">
									No Students Exist{" "}
									<span role="img" aria-label="sad">
										😢
									</span>
								</span>
							</div>
						</div>
					)}
				</Tab>

				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Succeeded Students"
				>
					{passedStudents && passedStudents.length !== 0 ? (
						passedStudents.map((passedStudent) => {
							return (
								<Link
									to={"/student/" + passedStudent.id}
									key={passedStudent.id}
								>
									<StudentSummary student={passedStudent} />
								</Link>
							);
						})
					) : (
						<div className="card z-depth-0 project-summary">
							<div className="card-content purple-text text-darken-3">
								<span className="card-title">
									No Students Exist{" "}
									<span role="img" aria-label="sad">
										😢
									</span>
								</span>
							</div>
						</div>
					)}
				</Tab>
				<Tab
					active
					options={{
						duration: 300,
						onShow: null,
						responsiveThreshold: Infinity,
						swipeable: false,
					}}
					title="Failed Students"
				>
					{failedStudents && failedStudents.length !== 0 ? (
						failedStudents.map((failedStudent) => {
							return (
								<Link
									to={"/student/" + failedStudent.id}
									key={failedStudent.id}
								>
									<StudentSummary student={failedStudent} />
								</Link>
							);
						})
					) : (
						<div className="card z-depth-0 project-summary">
							<div className="card-content purple-text text-darken-3">
								<span className="card-title">
									No Students Exist{" "}
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

export default StudentsList;
