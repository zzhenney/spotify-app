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
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                 <Link to='/'>Create Party</Link>
                </li>
                <li>
                 <Link to='/'>Join Party</Link>
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



export default connect(mapStateToProps, {authenticateUser})(Home);



