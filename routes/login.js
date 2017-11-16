/**
 * Created by wissem on 3/6/17.
 */

var express = require('express'),
    actions = require('../action/loginAction');
var passport = require('passport');

var router = express.Router();

router.post('/login', actions.authenticate);


router.get('/login',passport.authenticate({session : false}) ,function (req, res) {
    res.json({'message': 'Hello RT4'});
})

module.exports = router;