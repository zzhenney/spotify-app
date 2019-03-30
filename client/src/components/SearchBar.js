import React from 'react'; 
import {connect} from 'react-redux'; 
import {searchSongs} from '../actions/songActions'; 

class SearchBar extends React.Component {
	state = {value: ''} 
	searchQuery = (e) => {
		e.preventDefault();
		this.props.searchSongs(this.state.value);  
		
	}


	render(){
		return(
			<div className="md-form mt-0">
				<form onSubmit={this.searchQuery}>
			  		<input 
			  				className="form-control" 
			  				onChange={(e) => this.setState({value: e.target.value}) } 
			  				type="text" placeholder="Search" aria-label="Search"
			  		/>
				</form>
			</div>
		);
	}
}

export default connect(null, {searchSongs})(SearchBar); 