'use strict';

// Require .env in root
require('dotenv').config();
const bunyan = require('bunyan');

const log = {
    development: () => {
        return bunyan.createLogger({
            name: 'service-time-dev',
            level: 'debug'
        });
    },
    test: () => {
        return bunyan.createLogger({
            name: 'service-time-test',
            level: 'fatal'
        });
    },
    production: () => {
        return bunyan.createLogger({
            name: 'service-time-prod',
            level: 'info'
        });
    }
}

module.exports = {

    googleTimeApiKey: process.env.GOOGLE_TIME_API,
    googleGeoApiKey: process.env.GOOGLE_GEO_API,

    // Get TOKEN from .env file
    log: (env) => {

        // Return property when already present
        if(env) return log[env]();
        return log[process.env.NODE_ENV || 'development']();
    }
}