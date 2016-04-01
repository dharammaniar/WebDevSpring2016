/**
 * Created by dharam on 3/17/2016.
 */
'use strict';

module.exports = function(app) {

    var userModel = require('./models/user.model.js')();
    var formModel = require('./models/form.model.js')();
    var fieldModel = require('./models/field.model.js')(formModel);

    require('./services/user.service.server.js')(app, userModel);
    require('./services/form.service.server.js')(app, formModel);
    require('./services/field.service.server.js')(app, fieldModel);

};