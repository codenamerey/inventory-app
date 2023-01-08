var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const storeRouter = require('./routes/store');
const userRouter = require('./routes/user');

var app = express();
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB;
mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true});

//Get db connection
const db = mongoose.connection;
//Catch db connection error
db.on('error', console.error.bind(console, "MongoDB Connection Error: "));


const User = require('./models/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// User authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, (err, user) => {
      if(err) done(err, null);
      if(!user) {
        return done(null, false, {message:"Incorrect username"});
      }
      
      bcrypt.compare(password, user.password, (err, res) => {
        console.log(user.password);
        if(res) {
          // Passwords match, let user in
          return done(null, user);
        } else {
          return done(null, false, {message: "Incorrect password"});
        }
      })
    })
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});



app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
// catch 404 and forward to error handler

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/store', storeRouter);
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
  res.render('error');
});

module.exports = app;
