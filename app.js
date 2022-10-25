const express = require('express');
const app = express();

// Import routes files
const pokemon = require('./api/routes/pokemon');

// set up the routes
app.use("/pokemon", pokemon);

// error handling for every request that reaches this line
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// handle errors thrown from anywhere else in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app; // enable exporting of routes