'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService($http) {

        function findUserByUsername(username) {
            return $http.get('/api/projectOld/user?username='+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/projectOld/user?username=' + username + '&password=' + password);
        }

        function findAllUsers() {
            return $http.get('/api/projectOld/user');
        }

        function createUser(user) {
            return $http.post('/api/projectOld/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/projectOld/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/projectOld/user/' + userId, user);
        }

        function findLoggedInUser() {
            return $http.get('/api/projectOld/usersession');
        }

        function deleteUserSession() {
            return $http.delete('/api/projectOld/usersession');
        }

        return {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findLoggedInUser: findLoggedInUser,
            deleteUserSession: deleteUserSession
        };
    }
})();