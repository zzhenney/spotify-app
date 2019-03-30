import {SEARCH_SONG, SELECT_SONG} from '../actions/types'; 

const initialState = {
	searchSongs: [],
	currentlyPlaying: '',
	queuedList: []
}

const songReducer = (state = initialState, action) => {
	
	switch(action.type){
		case SEARCH_SONG:
			return {...state, searchSongs: action.payload}
		case SELECT_SONG:
			return {...state, currentlyPlaying: action.payload}
		default:
			return state
	}

}

export default songReducer; 