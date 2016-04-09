/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/projectOld/follows', createFollowsForUser);
    app.get('/api/projectOld/follows/:user1username', findAllFollowsForUser);
    app.delete('/api/projectOld/follows/:followsId', deleteFollowsById);
    app.put('/api/projectOld/follows/:followsId', updateFollowsById);

    function createFollowsForUser(req, res) {
        var follows = req.body;
        follows._id = uuid.v4();
        var createdFollows =  model.createFollowsForUser(follows);
        res.json(createdFollows);
    }

    function findAllFollowsForUser(req, res) {
        var user1username = req.params.user1username;
        var followsForUser = model.findAllFollowsForUser(user1username);
        res.json(followsForUser);
    }

    function deleteFollowsById(req, res) {
        var followsId = req.params.followsId;
        var allFollows = model.deleteFollowsById(followsId);
        res.json(allFollows);
    }

    function updateFollowsById(req, res) {
        var followsId = req.params.followsId;
        var follows = req.body;
        var updatedFollows = model.updateFollowsById(followsId, follows);
        res.json(updatedFollows);
    }

};