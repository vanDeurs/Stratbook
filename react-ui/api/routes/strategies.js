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
  res.json((testData.user.strategies))
});

router.post('/', (req, res) => {
  const newStrategy = req.body;
  newStrategy.id = testData.user.strategies.length + 1;
  newStrategy.created = new Date();

  testData.user.strategies.push(newStrategy);
  res.json(newStrategy);

})

// const strats = JSON.stringify(testData.user.strategies);
// res.json(JSON.parse(strats));

module.exports = router;