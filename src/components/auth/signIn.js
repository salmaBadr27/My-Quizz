import React, { Component } from "react";
import signin from "../img/signin.jpg";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
	state = {
		email: "",
		password: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.signIn(this.state);
	};

	render() {
		const { authError, auth } = this.props;
		if (auth.uid) return <Redirect to="/teacher-dashboard" />;
		return (
			<div className="container ">
				<div className="card row">
					<div className="  col s12 m6">
						<form onSubmit={this.handleSubmit} className="white ">
							<div className="purple-text center">
								{authError ? <p>{authError}</p> : null}
							</div>
							<h5 className="purple-text text-darken-3">Sign In</h5>
							<div className="input-field"></div>
							<label htmlFor="email">Email</label>
							<input type="email" id="email" onChange={this.handleChange} />
							<div className="input-field"></div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								id="password"
								onChange={this.handleChange}
							/>
							<div className="input-field center">
								<button className="  btn purple lighten-1 z-depth-0 white-text center">
									SignIn
								</button>
							</div>
						</form>
					</div>
					<div className="col s12 m5">
						<img className="materialboxed responsive-img" src={signin} alt="" />
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
