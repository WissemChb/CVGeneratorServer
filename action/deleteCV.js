/**
 * Created by wissem on 5/15/17.
 */
let MongoClient = require('mongodb').MongoClient;
let deletCV  = {
    deleteCurricul : function (req,res) {
        MongoClient.connect("mongodb://wiss013:ubuntu14.04@ds117899.mlab.com:17899/cv_gen_db", (err,db) =>{
            if(err){
                throw err;
            }
            console.log('connection to mlab succeeded');
            db.collection('users').update({username: req.params.id},
                {
                    $unset:{'cv': ""}
                },
                function (err,result) {
                    if(!err) {
                        res.json({success : true , msg : 'CV deleted successfully', result:result });
                    }else{
                        res.json({success : false , msg : 'oppps errors handled try again'+err});
                    }

                });
        });
    }
}
module.exports = deletCV;