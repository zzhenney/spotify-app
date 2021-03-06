import {AUTH_USER} from '../actions/types'

const initialState = {
	token: ''
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case AUTH_USER:
			return {...state, token: action.payload}
		default: 
			return state 
	}
} 

export default reducer;