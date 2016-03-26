'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .controller('SearchController', SearchController);

    function SearchController($rootScope, $location) {

        var vm = this;

        vm.findStock = findStock;

        function findStock(searchTerm) {
            $rootScope.searchTerm = searchTerm;
            $location.path('/searchResults');
        }

    }
})();
