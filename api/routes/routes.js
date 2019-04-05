'use strict';

module.exports = function(app) {
    var path = require('path');
    var validators = require( path.resolve( __dirname, "../controllers/validators.js" ))
	// validators​ Routes
	app.route('/api/v1/validators')
		.get( validators.read_validators )
		.post( validators.create_validator )

	app.route('/api/v1/validators/:validator_address')
		.get( validators.validator_address )
}