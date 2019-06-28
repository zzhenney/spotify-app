const express = require('express');
const router = express.Router();
const Users = require('../db/users');
const passport = require('passport');
let request = require('request');


router.post('/', 
	passport.authenticate('local-login', {session: true}), 
	function(req, res) {
		//shows users db tuple...
		//console.log(req)
		if(req.user){
			//console.log('redirect to local3000')
			//res.redirect('http://localhost:3000')
			console.log(req)
			let token = req.sessionID
			console.log(req.user.id)
			//delete req.user.password
			//console.log(req.user)
			//console.log(req.user.username)
			//console.log(req.session.user)
			//req.session.user = req.user.username
			//console.log(req.session.user.username)
			//console.log(res)
			//res.cookie('sessionID', token, {httpOnly: true}).sendStatus(200)
			res.sendStatus(200)
			/*
			res.status(200).send({
				success: true,
				token
			})
			*/
		
		}
		res.sendStatus(401)
	}  		
);

module.exports = router;