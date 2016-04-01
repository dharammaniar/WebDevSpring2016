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
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    },
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
        UserService.findLoggedInUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    $rootScope.user = currentUser;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/");
                }
            });
        return deferred.promise;
    }

    function getLoggedInUser(UserService, $q, $rootScope) {
        var deferred = $q.defer();
        UserService.findLoggedInUser()
            .then(function (response){
                $rootScope.user = response.data;
                deferred.resolve();
            });
        return deferred.promise;
    }
})();
