import {AUTH_USER} from './types'
import spotify from '../spotify'; 

export const authenticateUser = (authToken) => dispatch => {
	localStorage.setItem('jwtToken', authToken); 

	let user = null; 
	let play_id = ""; 

	spotify.get('me').then(res => {
		spotify.post(`users/${res.data.id}/playlists`, {	
				name: 'party'
		}).then(res => {
			console.log(res); 
		}).catch(err => console.log({err}))
		user = res.data.id
		dispatch({
			type: AUTH_USER,
			payload: {user: user, token: authToken, playlist: play_id}
		})
	})
	
		
	
}

