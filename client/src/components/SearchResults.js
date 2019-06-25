import React from 'react';
import {connect} from 'react-redux';
import {selectSong} from '../actions/songActions'; 


class SearchResults extends React.Component {

	renderCards(songs){

		return (songs.map(song => {
				return(
				   <div className="card">
				        <div className="row no-gutters">
				            <div className="col-auto">
				                <img src={song.album.images[2].url} onClick={() => {this.props.selectSong(song.id)}} className="img-fluid" alt=""/>
				            </div>
				            <div className="col">
				                <div className="card-block px-2">
				                    <h4 className="card-title">{song.name}</h4>
				                    <p className="card-text">{song.artists[0].name} - {song.album.name}<a style={{float: 'right'}}href="#" class="btn btn-primary">+</a></p>
				                </div>
				            </div>
				        </div>
				  </div>
				)
			}
		));
	}

	render(){
		const songs = this.props.songs
		let retVal;
		if(songs.length < 1 || songs === undefined){
			retVal = 'Search for songs to add'
		}else{
			 retVal = this.renderCards(this.props.songs);
		}

		return(
			<div>
				{retVal}
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return({songs: state.song.searchSongs});
} 

export default connect(mapStateToProps, {selectSong})(SearchResults)