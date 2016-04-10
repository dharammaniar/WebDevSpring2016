/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model'
                })
                .when("/searchResults", {
                    templateUrl: "views/search/searchResult.view.html",
                    controller: 'SearchResultController',
                    controllerAs: 'model'
                })
                .when("/stock/:code", {
                    templateUrl: "views/stock/stock.view.html",
                    controller: 'StockController',
                    controllerAs: 'model'
                })
                .otherwise({
                    redirectsTo: '/'
                });
        });
})();
