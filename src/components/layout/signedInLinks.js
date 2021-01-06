import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import M from "materialize-css";

class SignedInLinks extends Component {
	componentDidMount() {
		let elems = document.querySelectorAll(".dropdown-trigger");
		M.Dropdown.init(elems, { inDuration: 300, outDuration: 225 });
	}

	render() {
		const { signOut, profile } = this.props;
		return (
			<ul className="right">
				<div className="row">
					<div className="col">
						<li className="dropdown-trigger" data-target="dropdown1">
							Students
						</li>
						<ul id="dropdown1" className="dropdown-content">
							<li>
								<NavLink to="/create-student">Create</NavLink>
							</li>
							<li>
								<NavLink to="/students">View All</NavLink>
							</li>
						</ul>
					</div>
					<div className="col">
						<li className="dropdown-trigger" data-target="dropdown2">
							Quizzes
						</li>
						<ul id="dropdown2" className="dropdown-content">
							<li>
								<NavLink to="/create-quiz">Create</NavLink>
							</li>
							<li>
								<NavLink to="/#">View All</NavLink>
							</li>
						</ul>
					</div>
					<div className="col">
						<li>
							<a href="#+" onClick={signOut}>
								Log Out
							</a>
						</li>
					</div>
					<div className="col">
						<li>
							<NavLink to="/" className="btn btn-floating black darken-1">
								{profile.initials}
							</NavLink>
						</li>
					</div>
				</div>
			</ul>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut()),
	};
};
export default connect(null, mapDispatchToProps)(SignedInLinks);
