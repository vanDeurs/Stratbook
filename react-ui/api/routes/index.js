const express = require('express');
const router = express.Router();

const strategiesRouter = require('../strategies/controller');

router.use('/:map/strategies', strategiesRouter);

module.exports = router;
