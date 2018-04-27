const express = require('express');
const testData = require('../src/data/testData.json');

const router = express.Router();

router.get('/api', (req, res) => {
    console.log(testData.user)
    // res.send({ maps: testData.user })
});