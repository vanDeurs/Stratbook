import express from 'express';
import testData from '../src/data';

const router = express.Router();

router.get('/api', (req, res) => {
    console.log("Hello")
    res.send({ maps: testData.user })
});

export default router;