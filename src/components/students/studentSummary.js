import React from "react";

const StudentSummary = ({ student }) => {
	return (
		<div className="card z-depth-0 project-summary">
			<div className="card-content purple-text text-darken-3">
				<span className="card-title">{student.name}</span>
			</div>
		</div>
	);
};

export default StudentSummary;
