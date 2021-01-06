import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./signedInLinks";
import SignedOutLinks from "./signedOutLinks";
import { connect } from "react-redux";

class NavBar extends Component {
	render() {
		const { auth, profile } = this.props;
		//tracking auth status and which links to show
		const links = auth.uid ? (
			<SignedInLinks profile={profile} />
		) : (
			<SignedOutLinks />
		);
		return (
			<nav className="nav-wrapper purple lighten-1">
				<div className="container">
					<Link to="/" className=" left brand-logo ">
						<i className="Large material-icons">assignment</i>
						My Quizz
					</Link>
					<div className="show-on-med-and-down">{links}</div>
				</div>
			</nav>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps)(NavBar);
