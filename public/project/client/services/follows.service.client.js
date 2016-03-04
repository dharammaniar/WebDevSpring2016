'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('FollowsService', FollowsService);

    function FollowsService() {
        var allFollows = [
            {
                "_id": "1",
                "user1username": "alice",
                "user2username": "bob"
            },
            {
                "_id": "2",
                "user1username": "alice",
                "user2username": "charlie"
            },
            {
                "_id": "3",
                "user1username": "bob",
                "user2username": "charlie"
            }
        ];

        function createFollowsForUser(follows, callback) {
            _.extend(follows, {
                _id: (new Date).getTime()
            });
            allFollows[allFollows.length] = follows;

            callback(follows);
        }

        function findAllFollowsForUser(user1username, callback) {
            var followsFound = _.filter(allFollows, {
                user1username: user1username
            });

            callback(followsFound);
        }

        function deleteFollowsById(followId, callback) {
            _.remove(allFollows, function(follow) {
                return follow._id === followId;
            });

            callback(allFollows);
        }

        function updateFollowById(followId, updatedFollow, callback) {
            var followToUpdate = _.find(allFollows, {
                _id: followId
            });

            _.extend(followToUpdate, updatedFollow);

            callback(followToUpdate);
        }

        return {
            createFollowsForUser: createFollowsForUser,
            findAllFollowsForUser: findAllFollowsForUser,
            deleteFollowsById: deleteFollowsById,
            updateFollowById: updateFollowById
        };
    }
}());