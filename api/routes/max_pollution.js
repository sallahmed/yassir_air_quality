const express = require('express');
const { Iqair } = require('../models/iqair');
const route = express.Router();

route.get('/', async (req, res) => {
    const aqius = await Iqair.findOne({name: 'paris'}).select('datetime -_id').sort('-result.aqius').limit(1);
    res.send(aqius);
});

exports.max_pollution = route;