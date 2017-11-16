/**
 * Created by wissem on 3/6/17.
 */


let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');


let UserSchema = new Schema({
    firstName: {
        require: true,
        type: String
    },
    secondName: {
        require: true,
        type: String
    },
    username: {
        require: true,
        unique: true,
        type: String
    },
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    ExistCV : Boolean
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                user.ExistCV = false;
                next();
            });
        });
    } else {
        return next();
    }
});


const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function (username,callback) {
    User.findOne({username: username}, callback)

}
module.exports.getUserByEmail = function (email,callback) {
    User.findOne({email: email}, callback)

}

module.exports.comparePassword = function (passw,hash, callback) {
    bcrypt.compare(passw, hash, function (err, isMatch) {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, isMatch);
    });
}