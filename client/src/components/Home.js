import React from 'react'; 
import queryString from 'query-string'; 
import {authenticateUser} from '../actions/authActions'; 
import {connect} from 'react-redux'; 
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Login from '../components/Login';
import Search from '../components/Search.js'

class Home extends React.Component {

	componentDidMount(){
     
    	this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    	this.setState({token: queryString.parse(window.location.search).access_token})

  	}

  	render(){
      return (

          <div class='container'>
            <div class='row h-100 align-items-center'>
              <div class='col'></div>
              <div class='col text-center'>
                <a class='btn btn-success' href="http://localhost:5000/login">Auth Spotify</a> 
                <br />
                <br />                 
                <Link to='/create-party'>
                  <button class='btn-lg btn-success'>Create Party</button>
                </Link>
                <br />
                <br />
                <Link to='/join-party'>
                  <button class='btn-lg btn-success'>Join Party</button>
                </Link>
              </div>
              <div class='col'></div>
            </div>
            
          </div>

      );
    }
}

const mapStateToProps = (state) => {
  return ({
    token: state.token,
    currSong: state.song.currentlyPlaying
  })
}



export default connect(mapStateToProps, {authenticateUser})(Home);



