/**
 * @author dharam
 */
'use strict';
(function() {
    angular
        .module('PortManApp')
        .factory('UserService', UserService);

    function UserService($http) {

        function findUserByUsername(username) {
            return $http.get('/api/project/user?username='+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/project/user?username=' + username + '&password=' + password);
        }

        function createUser(user) {
            return $http.post('/api/project/user', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }

        function findLoggedInUser() {
            return $http.get('/api/project/usersession');
        }

        function deleteUserSession() {
            return $http.delete('/api/project/usersession');
        }

        return {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            createUser: createUser,
            updateUser: updateUser,
            findLoggedInUser: findLoggedInUser,
            deleteUserSession: deleteUserSession
        };
    }
})();