import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string'; 
import {connect} from 'react-redux'; 
import {authenticateUser} from './actions/authActions'; 
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';


class App extends Component {

  componentDidMount(){
     
    this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    this.setState({token: queryString.parse(window.location.search).access_token})

  }

  render() {
    let source = 'https://open.spotify.com/embed/track/' + this.props.currSong
    console.log(source);
    
    return(
      <div>
        <SearchBar/>
  
          <div className="row">
            <div className="col-med-5">
              <iframe style={{float: 'left'}} title="spotifyPlayer" src={`https://open.spotify.com/embed/track/${this.props.currSong}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div className="col-med-9">
                <SearchResults/>
            </div>
          
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



export default connect(mapStateToProps, {authenticateUser})(App);
