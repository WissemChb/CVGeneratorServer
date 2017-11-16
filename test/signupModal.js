'use strict';

var dbURI    = 'mongodb://localhost:27017/AppCVGEN';
require('should');
var mongoose = require('mongoose');
var User = require('../modals/user');

var user = {
    firstName : 'ben',
    secondName : 'wissem',
    username : 'wiss',
    email : 'xy@zt.sq',
    password : 'wissem',

}
describe('#Testing signupAction :',function(){


    describe("testing connection DB", function() {
        beforeEach(function (done) {
            mongoose.connect(dbURI, done);
            if (mongoose.connection.db) return done();

        });
    });

    it(' userModal should be defined ',() => {
        var userModal = new User();
        userModal.should.not.equal(undefined);
    });
it(" User can be saved", function(done) {
    User.prototype.save = function(Callback) {
        Callback();
    }
    var userModal = new User();
    userModal.save(function () {
        userModal.save(done);
    })
});
})

