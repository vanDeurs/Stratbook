const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router()
const path = require('path');
const formValidation = require('./validation');
const {createStrategyTable, selectAllStrategies} = require('../sql');

// Connect to DB
const db = new sqlite3.Database('./strategies.db', (err) => {
  if (err) {
      console.error(err.message);
      return;
  }
  console.log('Connected to the strategies database from controller.');
});

// GET strategies
router.get('/', (req, res) => {
  db.serialize(() => {
    // Create the strategy table
    const createStrategyQuery = createStrategyTable();
    if (createStrategyQuery){
      db.run(createStrategyQuery, err => {
        if (err){
          console.log("Error while creating the Country table!");
          console.log(err);
          return;
        }
        console.log('Successfully created the strategies table!!');
      });
    }
    // Get all strategies
    db.all(`SELECT * FROM Strategies;`, (err, rows) => {
      if (err){
        console.log('Failed retriving strategies.')
        console.log(err);
      }
      console.log('Successfully retrived strategies!');
      console.log(rows)
      res.send(rows)
    });
  });
});


// POST STRATEGY (add validation middleware)
router.post('/', (req, res) => {

  // Date stuff - all saved in a single const
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; // months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const today = year + "/" + month + "/" + day;

  // Create the strategy with some node sqlite3.
  // We use placeholders for the values
  db.run(
    `INSERT INTO Strategies VALUES (NULL, $nameValue, $mapValue, $typeValue, $summaryValue, $explanationValue, $created)`, 
    {
      $nameValue: req.body.nameValue,
      $mapValue: req.body.mapValue,
      $typeValue: req.body.typeValue,
      $summaryValue: req.body.summaryValue,
      $explanationValue: req.body.explanationValue,
      $created: today
    }, 
    // If there is an error, we send a 500 status code and return the error message.
    function (err) {
      if (err) {
        res.sendStatus(500);
        return console.log(err.message);
    }
    // If the post is successful we find the latest added strategy with a query,
    // And return it with a 201 status code.
    db.get(`SELECT * FROM Strategies WHERE id = ${this.lastID}`, (err, row) => {
      if (!row) {
        console.error('Couldnt access added row');
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(`A row has been inserted with row ${JSON.stringify(row)}`);
      res.status(201).send(row);
    });
  })
})

router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM Strategies WHERE id = ${req.params.id}`, (err, row) => {
    if (err) {
      console.log('error: ', err);
      return res.sendStatus(500);
    } 
    console.log('Deleted, row: ', row)
    res.status(204).send(row);
  });
})

module.exports = router;