import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string'; 
import {connect} from 'react-redux'; 
import {authenticateUser} from './actions/authActions'; 
import SearchPage from './components/Search/SearchPage';
import {BrowserRouter, Route} from 'react-router-dom'; 
import MainDisplay from './components/MainDisplay';


class App extends Component {

  componentDidMount(){
     
    this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    this.setState({token: queryString.parse(window.location.search).access_token,player_id: queryString.parse(window.location.search).device_id})

  }

  render() {
     console.log(this.state)
    let source = 'https://open.spotify.com/embed/track/' + this.props.currSong

    return(
      <BrowserRouter>
      <div>
        
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/" render={(props) => <MainDisplay currSong={this.props.currSong}/>  } /> 
        
      </div>
      </BrowserRouter>
      );
        
  }




}

const mapStateToProps = (state) => {
  return ({
    token: state.token,
    currSong: state.song.currentlyPlaying
  })
}



export default connect(mapStateToProps, {authenticateUser})(App);
