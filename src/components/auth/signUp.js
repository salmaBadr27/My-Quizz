import React, { Component } from "react";
import signup from "../img/signup.jpg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {
	state = {
		firstName: "",
		lastName: "",
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
		this.props.signup(this.state);
	};

	render() {
		const { auth, authError } = this.props;
		if (auth.uid) return <Redirect to="/teacher-dashboard" />;
		return (
			<div className="container">
				<div className="card row">
					<div className="col s12 m6">
						<form onSubmit={this.handleSubmit} className="white">
							<div className="purple-text center">
								{authError ? <p>{authError}</p> : null}
							</div>
							<h5 className="purple-text text-darken-3">Sign Up</h5>
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
							<div className="input-field"></div>
							<label htmlFor="firstname">First Name</label>
							<input type="text" id="firstName" onChange={this.handleChange} />
							<div className="input-field"></div>
							<label htmlFor="lastname">Last Name</label>
							<input type="text" id="lastName" onChange={this.handleChange} />
							<div className="input-field center">
								<button className="btn purple lighten-1 z-depth-0 white-text center">
									SignUp
								</button>
							</div>
						</form>
					</div>
					<div className="col s12 m5">
						<img className="materialboxed responsive-img" src={signup} alt="" />
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
		signup: (newUser) => dispatch(signUp(newUser)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
