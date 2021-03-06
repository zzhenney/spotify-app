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


const passport = require('./auth/passport');
const session = require('./auth/session');

let app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));



//express-session
app.use(session);
//passport
app.use(passport.initialize());
app.use(passport.session());

//maybe move cors to single route -- https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


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