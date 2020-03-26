import express from 'express';
import morgan from 'morgan';
import http from 'http';
import https from 'https';
var fs = require('fs');
//let http = require('http');
//let https = require('https');
//let morgan = require('morgan');
//let express = require('express')
let app = express();
let port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 4200;
let ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';//0.0.0.1


//http.createServer(app).listen(80);
//https.createServer({ ... }, app).listen(443);



// sets the render engine for express and uses morgan as a HTTP request logger.
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

// Routes HTTP GET requests to the specified path and includes a callback.
app.get('/', (_req, res) => {
    res.render('index.html', { pageCountMessage: null });
    //res.send('Hello World!')
})


// Binds and listens for connections on the specified host and port. identical to Node's http.Server.listen().
//app.listen(port, () => console.log(`Example app listening on port ${port}!`))
https.createServer(options, app).listen(port)
//app.listen(port, ip)
console.log('Server running on http://%s:%s', ip, port);

// error handling
app.use(function (err, _req, res, _next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

//module.exports = app;