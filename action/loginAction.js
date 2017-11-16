/**
 * Created by wissem on 3/6/17.
 */


let User = require('../modals/user');
let jwt = require('jwt-simple');

let functions = {
    authenticate: function (req, res) {

        if(req.body.username.indexOf('@')  == -1){
            User.getUserByUsername(req.body.username, (err,user) =>{
                if (err) throw err;
                else if (!user) {
                    return res.json({success: false, msg: 'Authenticaton failed, user not found.'});
                } else {
                    User.comparePassword(req.body.password,user.password,function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, 'RT4DEVTeam');
                            res.json({success: true, token: token, user : {
                                username: user.username,
                                firstName : user.firstName,
                                secondName  : user.secondName,
                                ExistCV : user.ExistCV
                            }});
                        } else {
                            return res.json({success: false, msg: 'Authenticaton failed, wrong password.'});
                        }
                    })};
            });
        }else{
            User.getUserByEmail(req.body.username, (err,user) =>{
                if (err) throw err;
                else if (!user) {
                    return res.json({success: false, msg: 'Authenticaton failed, user not found.'});
                } else {
                    User.comparePassword(req.body.password, user.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, 'RT4DEVTeam');
                            res.json({success: true, token: token, user : {
                                username: user.username,
                                firstName : user.firstName,
                                secondName  : user.secondName,
                                ExistCV : user.ExistCV
                            }});
                        } else {
                            return res.json({success: false, msg: 'Authenticaton failed, wrong password.'});
                        }
                    })};
            });
        }


    }

};
module.exports = functions;