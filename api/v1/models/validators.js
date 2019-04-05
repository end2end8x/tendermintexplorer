'use strict';

var path = require('path');
var fs = require("fs");
var contents = fs.readFileSync( path.resolve( __dirname, "../../dummy/rpcValidatorSet.json" ) )
var ValidatorSet = JSON.parse(contents);

module.exports = ValidatorSet