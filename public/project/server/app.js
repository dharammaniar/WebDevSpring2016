/**
 * @author dharam
 */
'use strict';

module.exports = function(app) {

    var stockModel = require('./models/stock.model.js')();
    require('./services/stock.service.server.js')(app, stockModel);

    var userModel = require('./models/user.model')();
    require('./services/user.service.server')(app, userModel);

    var portfolioModel = require('./models/portfolioStocks.model')(userModel);
    require('./services/portfolioStocks.service.server')(app, portfolioModel);
};