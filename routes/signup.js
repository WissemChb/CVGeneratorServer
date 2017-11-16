/**
 * Created by wissem on 3/6/17.
 */

'use strict';

let express = require('express');
let router = express.Router();
//let mongoose = require("mongoose");
let session = require('express-session');
let passport = require('passport');
//let cookieParser = require('cookie-parser');
//let bodyParser = require('body-parser');
let actions = require('../action/registerAction');
//let confirmEmail = require('../action/confirmEmailVerif');


/*router.get('/user',*/

router.post('/signup', actions.registerAction);

//router.get('/email-verification/:URL',confirmEmail.sendEmailVerif);

module.exports = router;
