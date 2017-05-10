'use strict';

const http = require('http');
const config = require('../config');
const log = config.log();
const service = require('../server/service')(config);
const server = http.createServer(service);
server.listen(process.env.port || 3001);

server.on('listening', function(){
    log.info(`Time service is listening on ${server.address().port} in ${service.get('env')} mode.`);
});