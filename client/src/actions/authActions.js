import {AUTH_USER} from './types'

export const authenticateUser = (authToken) => {
	localStorage.setItem('jwtToken', authToken); 
	return {
		type: AUTH_USER,
		payload: authToken 
	}
}

