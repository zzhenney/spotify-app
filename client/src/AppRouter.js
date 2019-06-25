import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search.js'
import Home from './components/Home.js'
import CreateParty from './components/CreateParty.js'
import JoinParty from './components/JoinParty.js'
import queryString from 'query-string'; 
import {authenticateUser} from './actions/authActions'; 
import {connect} from 'react-redux'; 

/*
class AppRouter extends React.Component {

	componentDidMount(){
     
    	this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    	this.setState({token: queryString.parse(window.location.search).access_token})

  	}
	
	render(){
		return (
			<Router>
				<div>
					<nav>
					  <Home />
						<ul>
							<li>
							 <Link to='/login'>Login</Link>
							</li>
							<li>
							 <Link to='/search'>Search Songs</Link>
							</li>
						</ul>
					</nav>
				</div>
				<Route path='/login' component={Login} />
				<Route path='/search' component={Search} />
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
  return ({
    token: state.token,
    currSong: state.song.currentlyPlaying
  })
}



export default connect(mapStateToProps, {authenticateUser})(AppRouter);

*/

class AppRouter extends React.Component {

	componentDidMount(){
     
    	this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    	this.setState({token: queryString.parse(window.location.search).access_token})

  	}

  	render(){
  		return (
			<Router>
				<Route exact path='/' component={Home} />
				<Route path='/login' component={Login} />
				<Route path='/create-party' component={CreateParty} />
				<Route path='/join-party' component={JoinParty} />
				<Route path='/search' component={Search} />
				<Route path='/spotify-auth' component={() => {
					window.location.href = 'http://localhost:5000/login';
					return null
				}}/>
			</Router>
		);
  	}
}

const mapStateToProps = (state) => {
  return ({
    token: state.token,
    currSong: state.song.currentlyPlaying
  })
}



export default connect(mapStateToProps, {authenticateUser})(AppRouter);




