'use strict';

var express = require('express');
var router = express.Router();
 
var path = require('path');
var validators = require( path.resolve( __dirname, "../controllers/validators.js" ))

router.get('/validators', validators.read_validators)
router.post('/validators', validators.create_validator)

router.get('/validators/:validator_address', validators.validator_address)
 
module.exports = router;