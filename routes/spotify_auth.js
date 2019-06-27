let express = require('express');
let request = require('request');
let router = express.Router();
let querystring = require('querystring');
const config = require('../spotifyConfig');
const User = require('../db/users')

//let username = '';

router.get('/login', function(req, res) {
  const {client_id, redirect_uri} = config ; 
  //username = req.params.id
  //const redirect_uri = redirect_url + '/' + username
  console.log('\n\n\n\n\n in /login \n\n\n\n')
  //console.log(req)
  console.log(`req.user: ${req.user}`)
  //console.log(`req.user.id: ${req.user[0].id}`)
  //console.log(`spot auth username check ${username}`)
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: 'streaming user-read-birthdate user-read-email user-read-private',
      redirect_uri
    }))
})

router.get('/callback', function(req, res) {
  const {client_id, redirect_uri, client_secret} = config ; 
  const userId = req.user
  let code = req.query.code || null

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        client_id + ':' + client_secret
      ).toString('base64'))
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    console.log('\n\n\n\n\n\n')
    //console.log(response)
    //console.log(response.statusCode)

    if(response.statusCode === 200){
      var access_token = body.access_token
    
      const refresh_token = body.refresh_token
      //save tokens to db
      authOptions = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }
      request.get(authOptions, function(error, response, body){
        //console.log(body)
        let bodyObject = JSON.parse(body)
        User.saveSpotifyData(req.user, access_token, refresh_token, bodyObject.id)

        let uri = config.front_end_uri || 'http://localhost:3000'
        res.redirect(uri + '?access_token=' + access_token)
      })
      //implement db function
      //User.saveTokens(access_token, refresh_token)
      //console.log(`access_token: ${access_token}`)
      //console.log(`refresh_token: ${refresh_token}`)
      //const userId = body.user_id
      //need to send back or save user id for spotify calls
      //console.log(`spotify user id: ${userId}`)
      //console.log(`username check at post spot ${username}`)
      //res.send({access_token: access_token})
      

    }
    else{
      console.log(`error: ${error}`)
    }
    
  })

})

module.exports = router;