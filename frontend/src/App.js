import React, { Component } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Panel from './components/common/Panel';
import { PrivateRoute } from './components/common/PrivateRoute';

import {
	Switch,
	Route
} from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route
					exact
					path='/login'
					component={SignIn}
				/>
				<PrivateRoute
					path='/'
					component={Panel}
				/>
			</Switch>
		);
	}
}

export default App;
