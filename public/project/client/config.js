/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectsTo: "/"
                });
        });
})();
