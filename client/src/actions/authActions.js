import {AUTH_USER} from './types'

export const authenticateUser = (authToken) => {
	return {
		type: AUTH_USER,
		payload: authToken 
	}
}