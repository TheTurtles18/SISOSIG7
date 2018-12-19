var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


process.env.NODE_ENv = 'development';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

 //app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/api', routes);



function _initializeModels (){
  mongoose.connect(config.db, { useNewUrlParser: true });
  mongoose.connection.on('error', function(err){
    console.log('MongoDb Failed to connect', {err:err});
  })
}

_initializeModels();
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
