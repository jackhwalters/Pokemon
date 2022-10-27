const { transports, format, createLogger } = require('winston');
require('dotenv').config();

// Initialise winston logger settings
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

var winstonFormat = format.combine(
    format.colorize(),
    format.json(),
    format.timestamp(),
    format.prettyPrint()
);

const logger = createLogger({
    format: winstonFormat,
    transports: winstonTransports
});

module.exports = { winstonTransports, winstonFormat, logger }