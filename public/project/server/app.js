/**
 * Created by dharam on 3/25/2016.
 */
'use strict';
module.exports = function(_, app, uuid) {

    var blogModel = require('./models/blog.model.js')(_);
    var commentModel = require('./models/comment.model.js')(_);
    var followModel = require('./models/follow.model.js')(_);
    var portfolioModel = require('./models/portfolio.model.js')(_);
    var stockModel = require('./models/stock.model.js')(_);
    var userModel = require('./models/user.model.js')(_);

    require('./services/blog.service.server.js')(_, app, blogModel, uuid);
    require('./services/comment.service.server.js')(_, app, commentModel, uuid);
    require('./services/follow.service.server.js')(_, app, followModel, uuid);
    require('./services/portfolio.service.server.js')(_, app, portfolioModel, uuid);
    require('./services/stock.service.server.js')(_, app, stockModel, uuid);
    require('./services/user.service.server.js')(_, app, userModel, uuid);

};