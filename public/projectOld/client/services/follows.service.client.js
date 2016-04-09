'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('FollowsService', FollowsService);

    function FollowsService($http) {

        function createFollowsForUser(follows) {
           return $http.post('/api/projectOld/follows', follows);
        }

        function findAllFollowsForUser(user1username) {
            return $http.get('/api/projectOld/follows/' + user1username);
        }

        function deleteFollowsById(followId) {
            return $http.delete('/api/projectOld/follows/' + followId);
        }

        function updateFollowById(followId, updatedFollow) {
            return $http.put('/api/projectOld/follows/' + followId, updatedFollow);
        }

        return {
            createFollowsForUser: createFollowsForUser,
            findAllFollowsForUser: findAllFollowsForUser,
            deleteFollowsById: deleteFollowsById,
            updateFollowById: updateFollowById
        };
    }
}());