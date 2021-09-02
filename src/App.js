import React, { Component } from 'react';
import Login from './components/login/Login';
import Register from './components/login/Register';
import ForgotPassword from './components/login/ForgotPassword';
import Dashboard from './components/login/Dashboard';
import Validasi from './components/login/Validasi';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";
class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
						<Switch>
							<Route exact path="/">
								<Login />
							</Route>
							<Route path="/register">
								<Register />
							</Route>
							<Route path="/forgot">
								<ForgotPassword />
							</Route>
							<Route path="/dashboard">
								<Dashboard />
							</Route>
							<Route path="/validasi">
								<Validasi />
							</Route>
							
						</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
