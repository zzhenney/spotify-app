import {AUTH_USER} from '../actions/types'

const initialState = {
	token: '',
	user: null
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case AUTH_USER:
			return {...state, token: action.payload.token, user: action.payload.user}
		default: 
			return state 
	}
} 

export default reducer;