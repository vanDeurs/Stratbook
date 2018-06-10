const express = require('express');
const sqlite3 = require('sqlite3');
const router = express.Router()
const path = require('path');
const formValidation = require('./validation');
const {createStrategyTable} = require('../sql');

// Connect to DB
const db = new sqlite3.Database('./strategies.db', err => {
  if (err) {
    console.log('Error while connecting to DB.');
      console.error('Error: ', err);
      return;
  }
  console.log('Connected to the strategies database from controller.');
});

// Create Strategies Table and GET strategies
router.get('/', (req, res) => {
  db.serialize(() => {

    // Create Strategies Table
    const createStrategyQuery = createStrategyTable();
    if (createStrategyQuery){
      db.run(createStrategyQuery, err => {
        if (err){
          console.log("Error while creating the Strategies table!");
          console.log('Error: ', err);
          return;
        }
        console.log('Successfully created the strategies table!!');
      });
    }

    // Retrive all strategies
    db.all(`SELECT * FROM Strategies;`, (err, strategies) => {
      if (err){
        console.log('Failed retriving strategies.');
        console.log('Error: ', err);
      }
      console.log('Successfully retrived strategies.');
      console.log('Strategies: ', strategies);
      res.send(strategies);
    });
  });
});

// GET a single strategy (GET)
router.get('/:id', (req, res) => {
    // Get all strategies
    db.get(`SELECT * FROM Strategies WHERE id = ${req.params.id};`, (err, strategy) => {
      if (err){
        console.log('Failed retriving strategy.');
        console.log('Error: ', err);
      }
      console.log('Successfully retrived strategy by id.');
      console.log('Strategy', strategy);
      res.send(strategy);
    });
});


// POST STRATEGY (add validation middleware) (POST)
router.post('/', (req, res) => {

  // Date stuff - all saved in a single const 'today'
  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; 
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();
  const today = year + "/" + month + "/" + day;

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

    db.get(`SELECT * FROM Strategies WHERE id = ${this.lastID}`, (err, row) => {
      if (!row) {
        console.error('Couldnt access added row');
        console.log('Error: ', err);
        return res.sendStatus(500);
      }
      console.log(`A row has been inserted with row ${JSON.stringify(row)}`);
      res.status(201).send(row);
    });
  })
})

// DELETE strategy (DELETE)
router.delete('/:id', (req, res) => {
  db.run(`DELETE FROM Strategies WHERE id = ${req.params.id}`, (err, deletedStrategy) => {
    if (err) {
      console.log('Error: ', err);
      return res.sendStatus(500);
    } 
    console.log('Deleted strategy');
    res.status(204).send(deletedStrategy);
  });
});

// UPDATE strategy (PUT)
router.put('/:id', (req, res) => {
  db.run(`UPDATE Strategies 
          SET nameValue = $nameValue, mapValue = $mapValue, typeValue = $typeValue, summaryValue = $summaryValue, explanationValue = $explanationValue
          WHERE id = ${req.params.id}
          `, {
            $nameValue: req.body.nameValue,
            $mapValue: req.body.mapValue,
            $typeValue: req.body.typeValue,
            $summaryValue: req.body.summaryValue,
            $explanationValue: req.body.explanationValue,
          }, 
          {
            function(err) {
              if (err){
                res.sendStatus(400);
                return console.log('error: ', err.message);
              }
              // Change this.lastID to req.params.id ?
              db.get(`SELECT * FROM Strategies WHERE id = ${req.params.id}`, (err, updatedStrategy) => {
                if (err || !updatedStrategy ) {
                  console.error('Couldnt access updated row');
                  console.log('Error: ', err);
                  return res.sendStatus(500);
                }
                console.log(`A row has been edited:  ${JSON.stringify(updatedStrategy)}`);
                res.status(200).send(updatedStrategy);
              });
            }
          }
        )
});

module.exports = router;