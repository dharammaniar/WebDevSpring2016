'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    },
                    controllerAs: 'model'
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: 'ProfileController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    },
                    controllerAs: 'model'
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    resolve: {
                        verifyUserIsLoggedInAndAdmin: verifyUserIsLoggedInAndAdmin
                    },
                    controller: 'AdminController',
                    controllerAs: 'model'
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: 'FormController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    },
                    controllerAs: 'model'
                })
                .when("/fields/:formId", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: 'FieldsController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    },
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectsTo: "/"
                });
        });

    function verifyUserIsLoggedIn(UserService, $q, $location, $rootScope) {
        var deferred = $q.defer();
        UserService.loggedin()
            .then(function (response){
                if (response.data === '0') {
                    delete $rootScope.user;
                    deferred.reject();
                    $location.url("/");
                } else {
                    $rootScope.user = response.data;
                    deferred.resolve();
                }
            });
        return deferred.promise;
    }

    function verifyUserIsLoggedInAndAdmin(UserService, $q, $location, $rootScope) {
        var deferred = $q.defer();
        UserService.loggedin()
            .then(function (response){
                if (response.data === '0') {
                    delete $rootScope.user;
                    deferred.reject();
                    $location.url("/");
                } else {
                    var user = response.data;
                    $rootScope.user = response.data;
                    if (user.roles.indexOf('admin') === -1) {
                        deferred.reject();
                        $location.url("/");
                    } else {
                        deferred.resolve();
                    }
                }
            });
        return deferred.promise;
    }

    function getLoggedInUser(UserService, $q, $rootScope) {
        var deferred = $q.defer();
        UserService.loggedin()
            .then(function (response){
                if (response.data === '0') {
                    delete $rootScope.user;
                    deferred.resolve();
                } else {
                    $rootScope.user = response.data;
                    deferred.resolve();
                }
            });
        return deferred.promise;
    }
})();
