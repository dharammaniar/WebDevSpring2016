(function() {
    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService() {
        var users = [{
                "_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "roles": ["student"]
            }, {
                "_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "roles": ["admin"]
            }, {
                "_id":345,
                "firstName":"Charlie",
                "lastName":"Brown",
                "username":"charlie",
                "password":"charlie",
                "roles": ["faculty"]
            }, {
                "_id":456,
                "firstName":"Dan",
                "lastName":"Craig",
                "username":"dan",
                "password":"dan",
                "roles": ["faculty", "admin"]
            }, {
                "_id":567,
                "firstName":"Edward",
                "lastName":"Norton",
                "username":"ed",
                "password":"ed",
                "roles": ["student"]
            }];

        function findUserByCredentials(username, password, callback) {
            var userFound = null;

            _.forEach(users, function(user) {
                if (user.username === username && user.password === password) {
                    userFound = user;
                }
            });
            callback(userFound);
        }

        function findAllUsers(callback) {
            callback(users);
        }

        function createUser(user, callback) {
            user._id = (new Date).getTime();
            users[users.length] = user;
            callback(user);
        }

        function deleteUserById(userId, callback) {
            _.remove(users, function(user) {
                return user._id === userId;
            });
            callback(users);
        }

        function updateUser(userId, user, callback) {
            deleteUserById(userId, function(){
                _(users).add(user);
                callback(user);
            });
        }

        return {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
    }
})();