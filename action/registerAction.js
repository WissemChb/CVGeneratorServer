/**
 * Created by wissem on 3/7/17.
 */



let Customer = require('../modals/user');
let  registerFunction = {
    registerAction :  function (req,res) {
        let customer = new Customer({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.passwordMatch.password
        });

        Customer.getUserByUsername(req.body.username, (err,user)=>{
            if(err){
                res.json({success: false, msg : "Something went wrong"});
                //throw err;
            }
            else if(user) {
                res.json({success: false, msg: "Existing username"});
            }else{
                Customer.getUserByEmail(req.body.email, (err, user) => {
                    if (err) {
                        res.json({success: false, msg : "Something went wrong"});
                       // throw err;
                    }
                    else if (user) {
                        res.json({success: false, msg : "Existing Email address"});
                    } else {
                        customer.save(function (err) {
                            if (!err) {
                                res.json({success: true , msg : "Welcome : You are now registred"});
                            } else {
                                res.json({success: false, msg : "Something went wrong"});
                                console.log('error signup function' + err);
                            }
                        });
                    }
                });
            }

            });
        }

};

module.exports = registerFunction;