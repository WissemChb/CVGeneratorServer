/**
 * Created by wissem on 5/23/17.
 */
'use strict'
let GetCVAction = require('../action/getCV');
let server  = require('../server');

describe('Get Cv : GET Test ',() => {
    let req, res, resp;
    beforeEach(()=>{
        res = {
            json : function (reslt) {
                resp = reslt;
            }

        };
        req = {
            params : {
                id : 'wiss013'
            }
        };
        it('should return User when GET method is invoked',() => {
            GetCVAction.getCv(req,res);
            resp.result.should.be.a('object');
        });
    });
});

