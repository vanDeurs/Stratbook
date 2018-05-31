const testData = require('../react-ui/src/data/testData.json');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3');

const {createStrategyTable} = require('../react-ui/api/sql');

const loggin = morgan('dev');
const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Router
const router = require('../react-ui/api/routes/index.js');
app.use('/', router);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.error(`Listening on port ${PORT}`);
});