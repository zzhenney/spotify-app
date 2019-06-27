const express = require('express');
const router = express.Router();
const Users = require('../db/users');
const passport = require('passport');
let request = require('request');


router.post('/', 
	passport.authenticate('local-login'), 
	function(req, res) {
		//shows users db tuple...
		//console.log(req.user)
		if(req.user){
			
			res.sendStatus(200)
		
		}
		res.sendStatus(401)
	}  		
);

module.exports = router;