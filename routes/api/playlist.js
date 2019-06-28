let express = require('express');
let http_request = require('request');
let router = express.Router();
let querystring = require('querystring');
const User = require('../../db/users.js')
//const config = require('../config');

router.post('/create', function(request, response, next) {
	//this may need to change. not sure how to handle tokens yet.
	if(request.isAuthenticated()){
		console.log('AUTHED UP')
	}
	console.log(request)
	console.log(`user: ${request.user.id}`)
	//console.log(`\n\n\n\n\n\n\n\n`)
	//console.log(request)
	console.log(request.body.partyName)
	const playlistName = request.body.partyName
	const userId = request.user.id

	let access_token = null
	let refresh_token = null
	let spotify_userid = null
	
	User.getSpotifyData(userId)
	.then(data => {
		console.log(data.access_token)
		access_token = data.access_token
		refresh_token = data.refresh_token
		spotify_userid = data.spotify_userid
		next()
	})
	.then(() =>{
		console.log(spotify_userid)
		let url = `https://api.spotify.com/v1/users/${spotify_userid}/playlists`;

		const requestOptions = {
			url: `${url}`,
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${access_token}`,
				'Content-Type':'application/json',
				
			},
			body: {
				name: `${playlistName}`,
				//collaborative playlists require private. 
				//may be easier just to make it public in regards
				//to adding attendees(users).
				'public': 'true'
			},
			json: true
		}

		http_request.post(requestOptions, function(err, res, body) {
			if(err) throw err;
			//else return the playlist id to host user
			//req.status does not exist?
			//if(req.status == 200)
			if(res.statusCode === 201 || 200){

				response.sendStatus(200);
			}
			else{
				console.log(body)
				console.log(err)
			}

		})
		
	})
	.catch(err => {
		console.log(err)
	})
})

module.exports = router