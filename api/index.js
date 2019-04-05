'use strict';

var express = require('express');
var router = express.Router();
 
router.use('/v1', require('./v1/routes'));
// router.use('/v2', require('./v2/routes'));

module.exports = router;