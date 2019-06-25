import React from 'react'; 
import queryString from 'query-string'; 
import {authenticateUser} from '../actions/authActions'; 
import {connect} from 'react-redux'; 
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CreateParty from '../components/CreateParty';
import JoinParty from '../components/JoinParty'

class Home extends React.Component {

	componentDidMount(){
     
    	this.props.authenticateUser(queryString.parse(window.location.search).access_token);
    	this.setState({token: queryString.parse(window.location.search).access_token})

  	}

  	render(){
      return (
          <div>
            <nav>
              <ul>
                <li>
                 <Link to='/create-party'>Create Party</Link>
                </li>
                <li>
                 <Link to='/join-party'>Join Party</Link>
                </li>
              </ul>
            </nav>
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



