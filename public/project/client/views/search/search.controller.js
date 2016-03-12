'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .controller('SearchController', SearchController);

    function SearchController($scope, $rootScope, $location) {

        $scope.findStock = findStock;

        function findStock(searchTerm) {
            $rootScope.searchTerm = searchTerm;
            $location.path('/searchResults');
        }

    }
})();
