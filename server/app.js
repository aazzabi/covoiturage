var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/Users');
var groupsRouter = require('./routes/Groups');
var privilegesRouter = require('./routes/Privileges');
var rideRouter = require('./routes/Ride');


const url = "mongodb://localhost:27017/covoiturage";
// const url = "mongodb+srv://admin:admin@covoiturage-nestw.mongodb.net/covoiturage";
mongoose.connect(url, { useNewUrlParser: true , useCreateIndex: true });
// mongoose.set({ usecreateIndexes: true });
var mongo = mongoose.connection;
mongo.on('connected', () => { console.log('Connected !') });
mongo.on('open', () => { console.log('Open !') });
mongo.on('error', (err) => { console.log(err) });
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ride',rideRouter);
app.use('/groups', groupsRouter);
app.use('/privileges', privilegesRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(passport.initialize());

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
