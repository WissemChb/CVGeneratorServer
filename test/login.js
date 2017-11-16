/**
 * Created by wissem on 4/16/17.
 */

'use strict';
let LoginAction = require('../action/loginAction');
let server  = require('../server');
let User = require('../modals/user');

describe(' Login : /POST Test with fake client request : ', () => {
    let req, res, resp;
    beforeEach(() => {
        res = {
            json:(reslt) => {
                resp = reslt;
            }
        };
    });

    describe('It should login the user whith his username : ',() => {
        beforeEach(() =>{
            req = {
                body : {
                    username:'test',
                    password : 'wissem'
                }
            };
        });
        it('should login the user',() => {
            User.getUserByUsername = function (username,callback) {
                callback(null,{username : 'test'});
            }
            User.comparePassword = function (password,passwd,callback) {
                callback(null,true);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(true);
        });
        it('should not login the user when his username is not found',() => {
            User.getUserByUsername = function (username,callback) {
                callback(null,null);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Authenticaton failed, user not found.');
        });
        it('should not login the user when his password is not valid.',() => {
            User.getUserByUsername = function (username,callback) {
                callback(null,{username : 'test'});
            }
            User.comparePassword = function (password,passwd,callback) {
                callback(null,false);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Authenticaton failed, wrong password.');
        });
    });

    describe('It should login the user whith his email : ',() => {
        beforeEach(() =>{
            req = {
                body : {
                    username:'test@gmail.com',
                    password : 'wissem'
                }
            };
        });
        it('should login the user',() => {
            User.getUserByEmail = function (username,callback) {
                callback(null,{username : 'test@gmail.com'});
            }
            User.comparePassword = function (password,passwd,callback) {
                callback(null,true);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(true);
        });
        it('should not login the user when his email is not found',() => {
            User.getUserByEmail = function (username,callback) {
                callback(null,null);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Authenticaton failed, user not found.');
        });
        it('should not login the user when his password is not valid.',() => {
            User.getUserByEmail = function (username,callback) {
                callback(null,{username : 'test@gmail.com'});
            }
            User.comparePassword = function (password,passwd,callback) {
                callback(null,false);
            }
            LoginAction.authenticate(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Authenticaton failed, wrong password.');
        });
    });



})




