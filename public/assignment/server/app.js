/**
 * Created by dharam on 3/17/2016.
 */
'use strict';

module.exports = function(_, app, uuid) {

    var userModel = require('./models/user.model.js')(_, app);
    var formModel = require('./models/form.model.js')(_, app);

    require('./services/user.service.server.js')(_, app, userModel, uuid);
    require('./services/form.service.server.js')(_, app, formModel, uuid);
    require('./services/field.service.server.js')(_, app, formModel, uuid);

};