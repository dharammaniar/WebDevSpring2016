/**
 * @author dharam
 */
'use strict';

module.exports = function(app, upload) {

    var stockModel = require('./models/stock.model.js')();
    require('./services/stock.service.server.js')(app, stockModel);

    var userModel = require('./models/user.model')();
    require('./services/user.service.server')(app, userModel, upload);

    var portfolioModel = require('./models/portfolioStocks.model')(userModel);
    require('./services/portfolioStocks.service.server')(app, portfolioModel);

    var commentModel = require('./models/comments.model')(userModel, stockModel);
    require('./services/portfolioComments.service.server')(app, commentModel);
    require('./services/stockMessages.service.server')(app, commentModel);

    var blogModel = require('./models/blog.model')();
    require('./services/blog.service.server')(app, blogModel);
};