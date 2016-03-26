'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('PortfolioController', PortfolioController);

    function PortfolioController($rootScope, $scope, PortfolioService) {

        $scope.userStocks = [];
        showAllStocksForUser();

        function showAllStocksForUser() {
            PortfolioService.findAllStocksForUser($rootScope.user._id)
                .then(function(comments){
                    $scope.userStocks = comments.data;
                    delete $scope.selectedStock;
                    delete $scope.selectedStockIndex;
                });
        }

        // Event Handler Declaration
        $scope.addStock = addStock;
        $scope.updateStock = updateStock;
        $scope.deleteStock = deleteStock;
        $scope.selectStock = selectStock;

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
            $scope.selectedStockIndex = index;
            $scope.selectedStock = {
                _id: $scope.userStocks[index]._id,
                userId: $scope.userStocks[index].userId,
                stock: $scope.userStocks[index].stock,
                price: $scope.userStocks[index].price,
                quantity: $scope.userStocks[index].quantity,
                date: new Date($scope.userStocks[index].date)
            }
        }
    }
}());