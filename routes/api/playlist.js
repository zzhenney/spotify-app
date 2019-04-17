let express = require('express');
let request = require('request');
let router = express.Router();
let querystring = require('querystring');
const config = require('../config');

router.get('/create-playlist', function(request, response, next) {
	//this may need to change. not sure how to handle tokens yet.
	const authToken = request.auth_token;
	const userId = request.userId;
	const playlistName = request.playlistName;
	let url = `https://api.spotify.com/v1/users/${userId}/playlists`;

	const requestOptions = {
		url: `${url}`,
		method: 'POST',
		headers: {
			'Authorization: Basic ' + authToken;
			'Content-Type: application/json';
		},
		body: {
			'name: ' + playlistName;
			//collaborative playlists require private. 
			//may be easier just to make it public in regards
			//to adding attendees(users).
			'public: true';
		}
	}

	const options = JSON.stringify(requestOptions);

	const body = JSON.stringify(bodyOptions);

	request(options, function(err, res, body) {
		if(err) throw err;
		//else return the playlist id to host user
		res.send(body.id);

	})


})