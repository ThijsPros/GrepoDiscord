"use strict";

const util = require('util');
const getenv = require('getenv');
const moment = require('moment');
const winston = require('winston');
const config = require('./config');

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      level: config.logLevel || getenv('BOT_LOGLEVEL', 'info'),
      // handleExceptions: true,
      // humanReadableUnhandledException: true,
      timestamp: () => {
        return new Date();
      },
      formatter: (options) => {
        let ts = util.format("[%s]", moment(options.timestamp()).format('HH:mm:ss')),
            level = winston.config.colorize(options.level);
        
        switch (options.level) {
          case 'debug':
            ts += " ⚙ ";
            break;
          case 'info':
            ts += " 🆗 ";
            break;
          case 'error':
            ts += " 🔥 ";
            break;
          case 'warn':
            ts += " ☣ ";
            break;
          case 'silly':
            ts += " 💩 ";
            break;
        }
        
        return ts +' '+ level +': '+ (undefined !== options.message ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
      }
    })
  ],
  exitOnError: false
});