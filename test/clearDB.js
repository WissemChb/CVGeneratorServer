/**
 * Created by wissem on 3/30/17.
 */

'use strict';

let mongoose = require('mongoose');
let dbURI    = 'mongodb://localhost:27017/AppCVGEN';
describe('Clearing DB test',function (){

    beforeEach(function (done) {


        function clearDB() {
            for (let i in mongoose.connection.collections) {
                mongoose.connection.collections[i].remove(function() {});
            }
            return done();
        }


        if (mongoose.connection.readyState === 0) {
            mongoose.connect(dbURI, function (err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }
    });


    afterEach(function (done) {
        mongoose.disconnect();
        return done();
    });
}) ;