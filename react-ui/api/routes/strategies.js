const express = require('express');
const testData = require('../../src/data/testData.json');
const router = express.Router()
const path = require('path');

router.get('/', (req, res) => {
  res.json((testData.user.strategies));
});

const strategyFieldType = {
  id: 'required',
  nameValue: 'required',
  mapValue: 'required',
  typeValue: 'required',
  summaryValue: 'required',
  explanationValue: 'required'
};

function validateStrategy(strategy){
  for (const field in strategyFieldType){
    const type = strategyFieldType[field];
    if (!type){
      delete strategy[field];
    } else if (type === 'required' && !strategy[field]){
      return `${field} is required.`;
    }
  }
}

router.post('/', (req, res) => {
  const newStrategy = req.body;
  newStrategy.id = testData.user.strategies.length + 1;
  newStrategy.created = new Date();

  const err = validateStrategy(newStrategy);
  if (err){
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  testData.user.strategies.push(newStrategy);
  res.json(newStrategy);

})

module.exports = router;