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

// Create strategy
router.post('/', (req, res) => {
  const newStrategy = req.body;
  newStrategy.id = testData.user.strategies.length + 1;
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;
  newStrategy.created = newdate;
  console.log(newdate);
  console.log(newStrategy.created);

  const err = validateStrategy(newStrategy);
  if (err){
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  testData.user.strategies.push(newStrategy);
  res.json(newStrategy);

})

router.delete('/', (req, res) => {
  const deleteStrategy = req.body;
})

module.exports = router;