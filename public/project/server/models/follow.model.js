/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var allFollows = require('./follow.mock.json');

    function createFollowsForUser(follows) {
        allFollows[allFollows.length] = follows;

        return follows;
    }

    function findAllFollowsForUser(user1username) {
        return _.filter(allFollows, {
            user1username: user1username
        });
    }

    function deleteFollowsById(followId) {
        _.remove(allFollows, function(follow) {
            return follow._id === followId;
        });

        return allFollows;
    }

    function updateFollowById(followId, updatedFollow) {
        var followToUpdate = _.find(allFollows, {
            _id: followId
        });

        _.extend(followToUpdate, updatedFollow);

        return followToUpdate;
    }

    return {
        createFollowsForUser: createFollowsForUser,
        findAllFollowsForUser: findAllFollowsForUser,
        deleteFollowsById: deleteFollowsById,
        updateFollowById: updateFollowById
    };
};