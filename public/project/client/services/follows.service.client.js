'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('FollowsService', FollowsService);

    function FollowsService($http) {

        function createFollowsForUser(follows) {
           return $http.post('/api/project/follows', follows);
        }

        function findAllFollowsForUser(user1username) {
            return $http.get('/api/project/follows/' + user1username);
        }

        function deleteFollowsById(followId) {
            return $http.delete('/api/project/follows/' + followId);
        }

        function updateFollowById(followId, updatedFollow) {
            return $http.put('/api/project/follows/' + followId, updatedFollow);
        }

        return {
            createFollowsForUser: createFollowsForUser,
            findAllFollowsForUser: findAllFollowsForUser,
            deleteFollowsById: deleteFollowsById,
            updateFollowById: updateFollowById
        };
    }
}());