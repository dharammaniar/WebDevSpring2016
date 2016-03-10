'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: 'HomeController'
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
                .when("/portfolio", {
                    templateUrl: "views/portfolio/portfolio.view.html",
                    controller: 'PortfolioController'
                })
                .when("/blogs", {
                    templateUrl: "views/blogs/blogs.view.html",
                    controller: 'BlogController'
                })
                .when("/follows", {
                    templateUrl: "views/follows/follows.view.html",
                    controller: 'FollowsController'
                })
                .when("/comments", {
                    templateUrl: "views/comments/comments.view.html",
                    controller: 'CommentController'
                })
                .otherwise({
                    redirectsTo: "/"
                });
        });
})();
