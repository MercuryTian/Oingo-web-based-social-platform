var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var noteRouter=require('./routes/note');
var mapRouter=require('./routes/map');
var newnoteRouter=require('./routes/newnote');
var testRouter = require('./routes/testNotes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', require('express-art-template'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/login', indexRouter);//login
app.use('/register', registerRouter);//register
app.use('/note', noteRouter);//note
app.use('/map', mapRouter);//note
app.use('/newnote', newnoteRouter);//note
app.use('/testNotes', testRouter);


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


var session = require('express-session');

// 设置 Session

//位置必须写在app.use('/', routes);前，否则下面中req.session.user 赋值时会报 TypeError: Cannot set property 'user' of undefined错误
app.use(session({
    secret: '12345',
    name: 'demo',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static('public'));//for the static files in the public
app.use(require('body-parser')());//to post the form


var mapRouter = require('./routes/map');
//var requestsRouter=require('./routes/request');
var notesRouter=require('./routes/notes');

var testRouter = require('./routes/testNotes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/requests', requestsRouter);
app.use('/notes', notesRouter);
app.use('/map', mapRouter);
app.use('/testNotes', testRouter);

module.exports = app;


