var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// passport  
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var user; // i think to logout set to null
//routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dataRouter = require('./routes/data');


passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json()); //1
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('combined')); //3
app.use(require('body-parser').urlencoded({extended:true})); //3
app.use(require('express-session')({secret: 'keyboard cat', resave:false,saveUninitialized: false}));

app.use(passport.initialize()); // 2
app.use(passport.session());

//app.use("/public/javascripts", express.static("./outJavascripts"));
//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public')); //4

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/data', dataRouter);
app.use('/data/add', dataRouter);
app.use('/data/update', dataRouter);
app.use('/data/delete', dataRouter);

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
  res.render('error');
});

module.exports = app;
