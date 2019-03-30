import spotify from '../spotify'; 
import {SEARCH_SONG, SELECT_SONG} from './types'; 

export const searchSongs = (q) => dispatch => {
	spotify.get('/search', {
			params: {
				q: q,
				type: 'track'
			}
		}).then((res) => {
			dispatch({
				type: SEARCH_SONG,
				payload: res.data.tracks.items
			});
		}).catch(err => console.log({err})); 
}

//!!test action **not in actual production!!// 
export const selectSong = (songId) => {
	console.log('songID' + songId)
	return({
		type: SELECT_SONG,
		payload: songId 
	})
}