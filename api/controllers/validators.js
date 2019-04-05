'use strict';

var path = require('path');
var fs = require("fs");
var contents = fs.readFileSync( path.resolve( __dirname, "../../rpcValidatorSet.json" ) )
var validatorSet = JSON.parse(contents);

exports.create_validator = (req, res) => {
    var validator = req.body
    res.send('create_validator ' + validator)
    if( validator != null ) {
        validatorSet.result.validators.push(validator)
    } 
}

exports.read_validators = (req, res) => {
    res.json(validatorSet.result)
}

exports.validator_address = (req, res) => {
    const address = req.params.validator_address
    var validator = validatorSet.result.validators.filter( item => item.address== address )
    res.json(validator)
}