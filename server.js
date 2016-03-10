#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var http = require('https');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

// Get News
app.get('/api/news', function(req, res){

    var url = null;
    if (req.query.title) {
        url = 'https://ajax.googleapis.com/ajax/services/search/news?v=2.0&q=' + req.query.title;
    } else {
        url = 'https://ajax.googleapis.com/ajax/services/search/news?v=2.0&topic=b';
    }

    http.get(url, function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            res.send(str);
        });
    }).end();

});

app.listen(port, ipaddress);

