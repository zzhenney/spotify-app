const db = require('../db');

const findUser  = (username) => {
	return db.one('SELECT * FROM users WHERE username=$1', [username])
		.then(data => {
			return data
		})
		.catch(err => {
			console.log('DB - Users: findUser err: ' + err)
		})

}

const saveSpotifyData = (userId, access_token, refresh_token, spotify_userid) => {
	db.none(`UPDATE users 
		SET access_token = '${access_token}', refresh_token = '${refresh_token}', spotify_userid = '${spotify_userid}'
		WHERE users.id = ${userId}`)
	.catch(err => {
		console.log(`DB saveToken error: ${err}`)
	})
}

const getSpotifyData = (userId) => {
	return db.one(`SELECT access_token, refresh_token, spotify_userid
		FROM users
		WHERE users.id = ${userId}`)
	.then(data => {
		return data
	})
	.catch(err => {
		console.log(`DB getSpotifyData error: ${err}`)
	})
}



module.exports = { findUser, saveSpotifyData, getSpotifyData }




