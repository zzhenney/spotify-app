import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string'; 
import {connect} from 'react-redux'; 
import {authenticateUser} from './actions/authActions'; 


class App extends Component {

  componentDidMount(){
    this.setState({token: queryString.parse(window.location.search).access_token}) 
    this.props.authenticateUser(queryString.parse(window.location.search).access_token);

  }

  render() {
    return (
      <div>
        <h1>Spotify App</h1>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return ({
    token: state.token
  })
}

export default connect(mapStateToProps, {authenticateUser})(App);
