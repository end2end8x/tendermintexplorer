'use strict';

var path = require('path');
var validatorSet = require( path.resolve( __dirname, "../models/validators" ) )

const success = { code: 200, status : "SUCCESS" }
const error = { code: 404, status : "ERROR" }

exports.create_validator = (req, res) => {
    var body = req.body
    if( body != null ) {
	    var address = body.address
	    var pub_key = body.pub_key
	    var voting_power = body.voting_power
	    var proposer_priority = body.voting_power
	    if(address == null && pub_key == null) {
		    res.json(error)
	    }
    	var validator = validatorSet.result.validators.filter( (item, idx) => item.address === address || (item.pub_key.type === pub_key.type &&  item.pub_key.value === pub_key.value ) )
    	.map( (foundObj, idx) => {
      		foundObj.voting_power = voting_power
      		validatorSet.result.block_height++
      		return foundObj; //updated obj
		})
    	if(validator.length == 0) {
    		validatorSet.result.validators.push(body)
    		var result = Object.assign({message: "CREATED"}, success)
		    res.json(result)
    	} else {
            var result = Object.assign({message: "UPDATED"}, success)
            res.json(result)
        }
    } else {
	    res.json(error)
    }
}

exports.read_validators = (req, res) => {
	var result = Object.assign({result: validatorSet.result }, success)
    res.json(result)
}

exports.validator_address = (req, res) => {
    var address = req.params.validator_address
    // var validator = validatorSet.result.validators.find( (item, idx) => item.address === address )
	for (var idx = 0; idx < validatorSet.result.validators.length; idx++) {
	    var item = validatorSet.result.validators[idx]
	    if(item != null && item.address === address) {
  			var resultValidator = Object.assign(item, {validatorIndex: idx})
    		var result = Object.assign({validator: resultValidator}, success)
		    res.json(result)
    		return
    	}
	}
	res.json(success)
}