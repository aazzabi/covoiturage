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
var carsRouter = require('./routes/Cars');
var packageRouter = require('./routes/Package');
var postRouter = require('./routes/Post');
var claimsRouter = require('./routes/Claims');
const webpush = require('web-push');
const url = "mongodb://localhost:27017/covoiturage";
// const url = "mongodb+srv://admin:admin@covoiturage-nestw.mongodb.net/covoiturage";
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});
// mongoose.set({ usecreateIndexes: true });
var mongo = mongoose.connection;
mongo.on('connected', () => {
    console.log('Connected !')
});
mongo.on('open', () => {
    console.log('Open !')
});
mongo.on('error', (err) => {
    console.log(err)
});
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    preserveExtension: true,
    useTempFiles: false
}));
const push = require("./routes/push");
const times = require('./routes/times');
const locations = require('./routes/location');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ride', rideRouter);
app.use('/groups', groupsRouter);
app.use('/privileges', privilegesRouter);
app.use('/cars', carsRouter);
app.use('/packages', packageRouter);
app.use('/posts', postRouter);
app.use('/claims', claimsRouter);
app.use("/api/push", push);
app.use("/api/locations", locations);
app.use("/api/times", times);

app.post('/upload', function (req, res) {
    let file;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    file = req.files.file;
    file.mv(__dirname + '/public/uploads/' + file.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded to ');
    });
});
const User = require('./models/User');
const vapidKeys = {
    publicKey:
        "BFtr-zLwB1QwRVtoG8AzL72ICVStkAO9_rtuDMLsRjfZFMz2XuvSFpjjDD1aOeE9Vpm542q5USaU6RE4QaGKSlo",
    privateKey: "mhbMw3l2kTuYeJZqJbbOBbC5Mra7kvwgotyEqh-VFKg"
};
//setting our previously generated VAPID keys
webpush.setVapidDetails(
    "mailto:nacef.otay123@gmail.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
setInterval(() => {
    const date = new Date();
        User.find()
            .then(users => {
                users.forEach(user => {
                    if (user.subscription) {
                        const subscription = JSON.parse(user.subscription);

                        const payload = JSON.stringify({
                            title: "Enter your location please",
                            username: user.username
                        });

                        webpush.sendNotification(subscription, payload)
                            .catch(err => {
                                // console.log(err);
                            });
                    }
                });
            });
        console.log("Sent notifications on", date.toString());

}, 60000);


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Cache-Control, Accept, Origin, X-Session-ID');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,TRACE,COPY,LOCK,MKCOL,MOVE,PROPFIND,PROPPATCH,UNLOCK,REPORT,MKACTIVITY,CHECKOUT,MERGE,M-SEARCH,NOTIFY,SUBSCRIBE,UNSUBSCRIBE,PATCH');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header('Access-Control-Max-Age', '1000');
    next();
});
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
