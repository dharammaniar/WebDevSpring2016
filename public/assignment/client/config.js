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
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: 'RegisterController'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: 'LoginController'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: 'ProfileController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: 'FormController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/fields/:formId", {
                    templateUrl: "views/forms/fields.view.html",
                    controller: 'FieldsController',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
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
