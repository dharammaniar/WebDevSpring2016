'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('PortfolioController', PortfolioController);

    function PortfolioController($rootScope, PortfolioService) {

        var vm = this;

        vm.userStocks = [];
        showAllStocksForUser();

        function showAllStocksForUser() {
            PortfolioService.findAllStocksForUser($rootScope.user._id)
                .then(function(comments){
                    vm.userStocks = comments.data;
                    delete vm.selectedStock;
                    delete vm.selectedStockIndex;
                });
        }

        // Event Handler Declaration
        vm.addStock = addStock;
        vm.updateStock = updateStock;
        vm.deleteStock = deleteStock;
        vm.selectStock = selectStock;

        //Event Handler Implementation
        function addStock(stock) {
            if (stock.stock && stock.price && stock.quantity && stock.date) {
                PortfolioService.createStockForUser($rootScope.user._id, stock).then(showAllStocksForUser);
            }
        }

        function updateStock(stock) {
            PortfolioService.updateStockById(stock._id, stock).then(showAllStocksForUser);
        }

        function deleteStock(stock) {
            PortfolioService.deleteStockById(stock._id).then(showAllStocksForUser);
        }

        function selectStock(index) {
            vm.selectedStockIndex = index;
            vm.selectedStock = {
                _id: vm.userStocks[index]._id,
                userId: vm.userStocks[index].userId,
                stock: vm.userStocks[index].stock,
                price: vm.userStocks[index].price,
                quantity: vm.userStocks[index].quantity,
                date: new Date(vm.userStocks[index].date)
            }
        }
    }
}());