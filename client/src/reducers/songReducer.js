import {SEARCH_SONG, SELECT_SONG, AUTH_USER} from '../actions/types'; 

const initialState = {
	playlist: '',
	searchSongs: [],
	currentlyPlaying: '4NLB1X9mugVd7QDSy51EHp',
	queuedList: []
}

const songReducer = (state = initialState, action) => {
	
	switch(action.type){
		case SEARCH_SONG:
			return {...state, searchSongs: action.payload}
		case SELECT_SONG:
			return {...state, currentlyPlaying: action.payload}
		case AUTH_USER:
			return {...state, playlist: action.payload.playlist}
		default:
			return state
	}
}

export default songReducer; 