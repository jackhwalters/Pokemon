const express = require('express');
const app = express();
const expressWinston = require('express-winston');
const { transports, format } = require('winston');
require('dotenv').config();

// Import routes files
const pokemon = require('./api/routes/pokemon');

var winstonTransports = [
    new transports.File({
        level: 'warn',
        filename: 'logs/warningLogs.log'
    }),
    new transports.File({
        level: 'error',
        filename: 'logs/errorLogs.log'
    })
];
if (process.env.NODE_ENV !== 'prod') {
    winstonTransports.push(new transports.Console());
}

// Install winston middleware for logging
app.use(expressWinston.logger({
    transports: winstonTransports,
    format: format.combine(
        format.colorize(),
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
    statusLevels: true
}));

// Set up the routes
app.use("/pokemon", pokemon);

// Error handling for every request that reaches this line
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Handle errors thrown from anywhere else in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app; // Enable exporting of routes