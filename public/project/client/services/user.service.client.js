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

        function updateUser(userId, user) {
            return $http.put('/api/project/user/' + userId, user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function register(user) {
            return $http.post('/api/project/register', user);
        }

        function findAllUsers() {
            return $http.get('/api/project/user');
        }

        function findById(userId) {
            return $http.get('/api/project/user/' + userId);
        }

        return {
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            logout: logout,
            login: login,
            register: register,
            findAllUsers: findAllUsers,
            findById: findById
        };
    }
})();