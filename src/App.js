import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/layout/navbar";
import TeacherDashboard from "./components/dashboard/teacherDashboard";
import studentsDashboard from "./components/dashboard/studentsDashboard";
import CreateStudent from "./components/students/createStudent";
import StudentDetails from "./components/students/studentDetails";
import EditStudent from "./components/students/editStudent";
import CreateQuiz from "./components/quiz/createQuiz";
import QuizDetails from "./components/quiz/quizDetails";
import SignIn from "./components/auth/signIn";
import SignUp from "./components/auth/signUp";
import "materialize-css/dist/css/materialize.min.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<NavBar />
				<Switch>
					<Route exact path="/" component={TeacherDashboard}></Route>
					<Route path="/signin" component={SignIn}></Route>
					<Route path="/signup" component={SignUp}></Route>
					<Route path="/students" component={studentsDashboard}></Route>
					<Route path="/student/:id" component={StudentDetails}></Route>
					<Route path="/create-student" component={CreateStudent}></Route>
					<Route path="/edit-student/:id" component={EditStudent}></Route>
					<Route path="/create-quiz" component={CreateQuiz}></Route>
					<Route path="/quiz/:id" component={QuizDetails}></Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
