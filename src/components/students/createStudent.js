import React, { Component } from "react";
import create from "../img/create.png";
import { connect } from "react-redux";
import { createStudent } from "../../store/actions/studentActions";
import { Redirect, Link } from "react-router-dom";

class CreateStudent extends Component {
	state = {
		email: "",
		name: "",
		score: 0,
		pass_status: false,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.createStudent(this.state);
		this.props.history.push("/students");
	};

	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;
		return (
			<div className="container">
				<div className=" card row">
					<div className="  col s12 m6">
						<form onSubmit={this.handleSubmit} className="card-content white ">
							<h5 className="purple-text text-darken-3">Create Student</h5>
							<div className="input-field"></div>
							<label htmlFor="title">Email</label>
							<input
								type="text"
								name=""
								id="email"
								onChange={this.handleChange}
							/>
							<div className="input-field"></div>
							<label htmlFor="title">Name</label>
							<input
								type="text"
								name=""
								id="name"
								onChange={this.handleChange}
							/>
							<div className="input-field center">
								<button className="btn purple lighten-1 z-depth-0 white-text center">
									Create
								</button>
								<Link to="/students" className="purple-text">
									<button className="btn grey darken-0">Cancel</button>
								</Link>
							</div>
						</form>
					</div>
					<div className="col s12 m5 center">
						<img
							className="materialboxed responsive-img"
							width="300"
							src={create}
							alt=""
						/>
					</div>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		createStudent: (student) => dispatch(createStudent(student)),
	};
};
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
