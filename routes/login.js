const express = require('express');
const router = express.Router();
const Users = require('../db/users');
const passport = require('passport');


router.post('/', 
	passport.authenticate('local-login'), 
	function(req, res) {
		if(req.user){
			res.sendStatus(200)	
		}
		res.sendStatus(401)
	}  		
);

module.exports = router;