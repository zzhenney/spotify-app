let express = require('express')
let request = require('request')
let querystring = require('querystring')
const config = require('./config')

let app = express()

app.get('/login', function(req, res) {
  const {client_id, redirect_uri} = config ; 
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: 'streaming user-read-birthdate user-read-email user-read-private playlist-modify-public playlist-modify-private',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  const {client_id, redirect_uri, client_secret} = config ; 
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
    var access_token = body.access_token
    let uri = config.front_end_uri || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token + '&device_id=-1')
  })
})

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)