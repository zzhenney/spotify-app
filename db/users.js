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



module.exports = { findUser }