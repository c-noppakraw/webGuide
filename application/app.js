var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var compression = require('compression');
// var loginbackend = require('./model/login');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var resetRouter = require('./routes/reset');
var mainguideRouter = require('./routes/mainguide');
var mainadminRouter = require('./routes/mainadmin');
var loginRouter = require('./routes/login');

var app = express();
app.use(compression());
app.use(session({
  //     name:'secret', // ถ้าไม่กำหนด ค่าเริ่มต้นเป็น 'connect.sid'
      secret: 'secret',
      resave: true,
      saveUninitialized: true
  // cookie: { maxAge: 60000 }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/reset', resetRouter);
app.use('/mainguide', mainguideRouter);
app.use('/mainadmin', mainadminRouter);

// app.use(loginbackend());

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
