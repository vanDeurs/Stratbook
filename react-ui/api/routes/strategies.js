const express = require('express');
const testData = require('../../src/data/testData.json');
const router = express.Router()
const path = require('path');

// router.get('/', (req, res, next) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(testData.user.strategies));
//   // res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
//   });

router.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  const strats = JSON.stringify(testData.user.strategies);
  res.send(JSON.parse(strats));
  });

module.exports = router;