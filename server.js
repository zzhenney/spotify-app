if(process.env.NODE_ENV === 'development') {
	require("dotenv").config();
}


const createError = require('http-errors');
let express = require('express')
const cors = require('cors')
let request = require('request')
let querystring = require('querystring')
const logger = require('morgan');
//const config = require('./config')
const cookieParser = require('cookie-parser')

const passport = require('./auth/passport');
const session = require('./auth/session');

let app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(require('body-parser').urlencoded({extended: true}));
//app.use(express.urlencoded({ extended: false }));

//not secure remove
app.use(cookieParser('3jis89928uunia'))


//express-session
app.use(session);
//passport
app.use(passport.initialize());
app.use(passport.session());


//maybe move cors to single route -- https://expressjs.com/en/resources/middleware/cors.html
/*
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'credentials': true,
  'origin': ['http://localhost:3000', 'http://192.168.86.243:3000']
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
  next();
});
*/

//app.use((req, res, next) => {req.user = req.session.user; next()})

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
if ('OPTIONS' == req.method) {
     res.send(200);
 } else {
     next();
 }
});

//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//app.options('/api/login', cors())
//app.options('/api/playlist/create', cors())


//Routers
const spotifyAuthRouter = require('./routes/spotify_auth');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout')
const playlistRouter = require('./routes/api/playlist')


app.use('/', spotifyAuthRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/playlist/', playlistRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;