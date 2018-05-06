const testData = require('../react-ui/src/data/testData.json');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.json());


// Strategies router
const strategiesRouter = require('../react-ui/api/routes/strategies');
app.use('/:map/strategies', strategiesRouter)

// Setups router
// const setupsRouter = require('../react-ui/api/routes/setups');
// app.use('/:map/setups', setupsRouter)

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT,() => {
  console.error(`Listening on port ${PORT}`);
});