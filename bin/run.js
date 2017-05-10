'use strict';

const http = require('http');
const config = require('../config');
const log = config.log();
const request = require('superagent');
const service = require('../server/service')(config);
const server = http.createServer(service);

// Take a port chosen by node
server.listen();

server.on('listening', function(){
    log.info(`Time service is listening on ${server.address().port} in ${service.get('env')} mode.`);

    // Quick n dirty
    const mainUrl = 'http://127.0.0.1:3000';

    const announce = () => {
        request.put(`${mainUrl}/service/time/${server.address().port}`)
        .end((err) => {
            if(err) log.error(err);
        })
    }

    announce();

    // All 20s; timeout 30s
    setInterval(announce, 20 * 1000);
});