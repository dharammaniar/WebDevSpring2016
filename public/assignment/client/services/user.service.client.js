'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService($http) {

        function register(user) {
            return $http.post('/api/assignment/register', user);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

        function loggedin() {
            return $http.get('/api/assignment/loggedin');
        }

        function login(user) {
            return $http.post('/api/assignment/login', user);
        }

        function logout() {
            return $http.post('/api/assignment/logout');
        }


        function findAllUsers() {
            return $http.get('/api/assignment/admin/user');
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function updateUserAdmin(userId, user) {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function findUserById(userId) {
            return $http.get('/api/assignment/admin/user/' + userId);
        }


        return {
            findAllUsers: findAllUsers,
            register: register,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            loggedin: loggedin,
            login: login,
            logout: logout,
            updateUserAdmin: updateUserAdmin,
            findUserById: findUserById
        };
    }
})();