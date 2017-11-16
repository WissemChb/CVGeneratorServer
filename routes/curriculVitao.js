/**
 * Created by wissem on 4/22/17.
 */

let express = require('express');
let actionCV = require('../action/saveCV');
let router = express.Router();
let getCV = require('../action/getCV');
let deleteCV = require('../action/deleteCV');


router.put('/user', actionCV.saveCv);
router.get('/user/:id',getCV.getCv);
router.delete('/user/:id',deleteCV.deleteCurricul);



module.exports= router;