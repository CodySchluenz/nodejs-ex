//import express from 'express';
//import morgan from 'morgan';
//import * as http from 'http';
//import * as https from 'https';
var fs = require('fs');
let http = require('http');
let https = require('https');
let morgan = require('morgan');
let express = require('express')
let app = express();
let port = parseInt(process.env.PORT) || parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8443;
let ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';//0.0.0.1
let tlsKey = process.env.tlsKey;
let tlsCrt = process.env.tlsCrt;

console.log('----------')
console.log('tlsKey')
console.log(tlsKey);

console.log('tlsCrt')
console.log(tlsCrt);
console.log('----------')

console.log('----------')
console.log('hard coded port' + 8443);
console.log('process.env.PORT' + process.env.PORT);
console.log('process.env.OPENSHIFT_NODEJS_PORT' + process.env.OPENSHIFT_NODEJS_PORT);

console.log('hard coded ip' + '127.0.0.1');
console.log('process.env.IP' + process.env.IP);
console.log('process.env.OPENSHIFT_NODEJS_IP' + process.env.OPENSHIFT_NODEJS_IP);
console.log('----------')

const options = {
    key: tlsKey,//fs.readFileSync('src/tlskey.pem'),
    cert: tlsCrt//fs.readFileSync('src/tlscert.pem')
};

// sets the render engine for express and uses morgan as a HTTP request logger.
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

// Routes HTTP GET requests to the specified path and includes a callback.
app.get('/', (_req, res) => {
    res.render('index.html', { pageCountMessage: null, tlsKey, tlsCrt });
    //res.send('Hello World!')
})


//let httpServer = http.createServer(app);
let httpsServer = https.createServer(options, app);

// Binds and listens for connections on the specified host and port. identical to Node's http.Server.listen().

//https server
httpsServer.listen(port, ip);

//http server
//httpServer.listen(port, ip);


console.log('Server running on https://%s:%s', ip, port);

// error handling
app.use(function (err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

//module.exports = app;