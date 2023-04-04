const express = require('express');
//Routes
const {pollution} = require('../api/routes/pollution');
const {max_pollution} = require('../api/routes/max_pollution');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/pollution', pollution);
    app.use('/api/max_pollution', max_pollution);
};