/**
 * Created by wissem on 3/30/17.
 */

'use strict';
let SignupAction = require('../action/registerAction');
let server  = require('../server');
let Customer = require('../modals/user');

    describe(' SignUp : /POST Test with fake client request : ', () => {
        let req, res, resp;
        beforeEach(() => {
          res = {
                json:(reslt) => {
                    resp = reslt;
                }
            };
            req = {
                body : {
                    firstName : 'test',
                    secondName : 'test',
                    username:'test',
                    email : 'test@gmail.com',
                    passwordMatch : {
                        password : 'wissem'
                    }
                }
            };
        });

         it('should save the user',() => {
            Customer.getUserByUsername = function (username,callback) {
                callback(null,null);
            };
            Customer.getUserByEmail = function (email,callback) {
                callback(null, null);
            };
            SignupAction.registerAction(req,res);
            resp.success.should.equal(true);
            resp.msg.should.equal('Welcome : You are now registred')

        });
        it('should not save the user when the username exist"',() => {
            Customer.getUserByUsername = function (username,callback) {
                callback(null,{username : 'test'});
            };
            SignupAction.registerAction(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Existing username')

        });
        it('should not save the user when the email exist"',() => {
            Customer.getUserByUsername = function (username,callback) {
                callback(null,null);
            };
            Customer.getUserByEmail = function (email,callback) {
                callback(null,{email : 'email@gmail.com'});
            };
            SignupAction.registerAction(req,res);
            resp.success.should.equal(false);
            resp.msg.should.equal('Existing Email address');

        });
        describe(' It should not save the user when error occured: ',() => {
            it('when finding username',() => {
                Customer.getUserByUsername = function (username,callback) {
                    callback('error',null);
                };
                SignupAction.registerAction(req,res);
                resp.success.should.equal(false);
                resp.msg.should.equal('Something went wrong');

            });
            it('when finding email',() => {
                Customer.getUserByUsername = function (username,callback) {
                    callback(null,null);
                };
                Customer.getUserByEmail = function (email,callback) {
                    callback('error',null);
                };
                SignupAction.registerAction(req,res);
                resp.success.should.equal(false);
                resp.msg.should.equal('Something went wrong');

            });
        });


    });


