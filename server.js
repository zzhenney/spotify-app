let express = require('express')
let request = require('request')
let querystring = require('querystring')
const config = require('./config')

let app = express()

const spotifyAuthRouter = require('./routes/spotify_auth');

app.use('/', spotifyAuthRouter);

let port = process.env.PORT || 5000
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)