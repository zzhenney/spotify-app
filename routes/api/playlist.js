let express = require('express');
let http_request = require('request');
let router = express.Router();
let querystring = require('querystring');
const User = require('../../db/users.js')
//const config = require('../config');

router.get('/create/:name', function(request, response, next) {
	//this may need to change. not sure how to handle tokens yet.
	const playlistName = request.params.name
	console.log(request.user)
	const userId = request.user
	let access_token = null
	let refresh_token = null
	let spotify_userid = null
	
	User.getSpotifyData(userId)
	.then(data => {
		const user = data
		console.log(user)
		//console.log(user.access_token)
		access_token = user.access_token
		refresh_token = user.refresh_token
		spotify_userid = user.spotify_userid
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

		//const options = JSON.stringify(requestOptions);

		//const body = JSON.stringify(bodyOptions);

		http_request.post(requestOptions, function(err, res, body) {
			if(err) throw err;
			//else return the playlist id to host user
			response.send(body);

		})
	})
	.catch(err => {
		console.log(err)
	})

	
	
	/*
	const authToken = request.auth_token;
	const userId = request.userId;
	const playlistName = request.playlistName;
	let url = `https://api.spotify.com/v1/users/${userId}/playlists`;

	const requestOptions = {
		url: `${url}`,
		method: 'POST',
		headers: {
			Authorization: `Basic ${authToken}`,
			'Content-Type: application/json'
		},
		body: {
			'name: ' + playlistName,
			//collaborative playlists require private. 
			//may be easier just to make it public in regards
			//to adding attendees(users).
			'public: true'
		}
	}

	const options = JSON.stringify(requestOptions);

	const body = JSON.stringify(bodyOptions);

	request(options, function(err, res, body) {
		if(err) throw err;
		//else return the playlist id to host user
		res.send(body.id);

	})
	*/
	


})

module.exports = router