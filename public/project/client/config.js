'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
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
                    controller: 'ProfileController'
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/follows", {
                    templateUrl: "views/follows/follows.view.html",
                    controller: 'FollowsController'
                })
                .when("/fields", {
                    templateUrl: "views/forms/fields.view.html"
                })
                .otherwise({
                    redirectsTo: "/"
                });
        });
})();
