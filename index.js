const express = require('express');
const app = express();

// Database
require('./app/database')();

// Cronjobs
if(process.env.NODE_ENV != 'test') {
    require('./app/cronjobs');
}

// API Routes
require('./app/routes')(app);

const server = app.listen(3000, () => console.log(`INFO: Listening on port 3000...`));

module.exports = server;