const apiRouter = require('../react-ui/api');
const testData = require('../react-ui/src/data/testData.json');

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;


//   // Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Router
// app.use('/data', apiRouter)
app.get('/:map/strategies', (req, res) => {
  console.log("Hello there!", testData.user.strategies)
  res.send(testData.user.strategies)
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Listening on port ${PORT}`);
});




// import apiRouter from './api';
// import testData from '../src/data';

// const express = require('express');
// const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

// const PORT = process.env.PORT || 5000;

// // Multi-process to utilize all CPU cores.
// if (cluster.isMaster) {
//   console.error(`Node cluster master ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//   });

// } else {
//   const app = express();

//   // Priority serve any static files.
//   app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//   // Router
//   // app.use('/data', apiRouter)
//   app.get('/:map/strategies', (req, res) => {
//     console.log("Hello there!")
//     res.send({ maps: testData.user })
// });

//   // Answer API requests.
//   app.get('/api', function (req, res) {
//     res.set('Content-Type', 'application/json');
//     res.send('{"message":"Hello from the custom server! xxxxxx"}');
//   });

//   // All remaining requests return the React app, so it can handle routing.
//   app.get('*', function(request, response) {
//     response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
//   });

//   app.listen(PORT, function () {
//     console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
//   });
// }