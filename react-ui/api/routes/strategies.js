const express = require('express');
const testData = require('../../src/data/testData.json');
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
  res.json((testData.user.strategies))
});

router.post('/', (req, res) => {
  const newStrategy = req.body;
  newStrategy.id = testData.user.strategies.length + 1;
  newStrategy.created = new Date();
  
  testData.user.strategies.push(newStrategy);
  console.log(newStrategy)
  console.log('body',req.body)
  res.json(newStrategy);

})

module.exports = router;