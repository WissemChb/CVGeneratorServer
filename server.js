/**
 * Created by wissem on 2/22/17.
 */

'use strict';

let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookiesparer = require('cookie-parser');
let bodyParser = require('body-parser');
let cors = require('cors');
let passport = require('passport');
let mongoose = require('mongoose');

let index = require('./routes/index');
let register = require('./routes/signup');
let login = require('./routes/login');
let cv = require('./routes/curriculVitao');

let app = express();

//#################################################Alow CORS########################################

 app.use(cors());

//####################################################view engine####################################"

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookiesparer());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/user', register);
app.use('/auth', login);
app.use('/cv',cv);



//####################################initialise passport####################################

app.use(passport.initialize());
require('./src/config/passport')(passport);

//#######################################Connect to mongodb via mongoose##################################

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://wiss013:ubuntu14.04@ds117899.mlab.com:17899/cv_gen_db");

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to mLab DB');
});



let server = app.listen(process.env.port || 8085, function () {
    let port = server.address().port;
    console.log('App listening at http://localhost:%s', port);
});

module.exports = server;
