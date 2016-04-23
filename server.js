#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var mongoose = require('mongoose');
// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/form-builder-app';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);

var _  = require('lodash');
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// configure session support
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// initialize passport and session support
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

/*Multer Storage Config*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
var upload = multer({storage: storage});

require('./public/assignment/server/app')(app, db, uuid);
require('./public/project/server/app')(app, upload);
require('./public/projectOld/server/app')(_, app, uuid);

app.listen(port, ipaddress);

