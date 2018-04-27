const express = require('express');
const testData = require('../../src/data/testData.json');
const router = express.Router()

router.get('/', (req, res, next) => {
    res.send(testData.user.strategies)
  });

module.exports = router;