#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();
var http = require('https');

var bodyParser = require('body-parser');
var multer = require('multer');

var uuid = require('node-uuid');

var _  = require('lodash');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

require('./public/assignment/server/app')(_, app, uuid);
require('./public/project/server/app')(_, app, uuid);

app.listen(port, ipaddress);

