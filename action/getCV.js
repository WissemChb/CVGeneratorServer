/**
 * Created by wissem on 5/8/17.
 */
let MongoClient = require('mongodb').MongoClient
let curriculum ={
    getCv : function (req, res) {
        MongoClient.connect("mongodb://wiss013:ubuntu14.04@ds117899.mlab.com:17899/cv_gen_db", (err,db) =>{
            if(err){
                throw err;
            }
            console.log('connection to mlab succeeded');
            db.collection('users').findOne({username: req.params.id},{cv : 1, _id : 0},
                function (err,result) {
                    if(!err) {
                        res.json(result);
                    }else{
                        res.json({success : false , msg : 'oppps errors handled try again'+err});
                    }

                });
        });


    }
}
module.exports = curriculum;
