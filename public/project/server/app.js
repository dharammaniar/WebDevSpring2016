/**
 * @author dharam
 */
'use strict';

module.exports = function(app) {

    var stockModel = require('./models/stock.model.js')();

    require('./services/stock.service.server.js')(app, stockModel);
};