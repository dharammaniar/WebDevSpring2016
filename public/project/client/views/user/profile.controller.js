/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $location, $routeParams, UserService, PortfolioService) {
        var vm = this;
        vm.showSuccessAlert = false;
        vm.user = $rootScope.user;

        vm.userId = $routeParams.userId;
        vm.isSelf = true;
        if (vm.user._id !== vm.userId) {
            vm.isSelf = false;
            UserService.findById(vm.userId)
                .then(
                    function(response) {
                        vm.user = response.data;
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        init();
        
        function init() {
            vm.invTotal = 0;
            vm.currentTotal = 0;
            PortfolioService.getPortfolio(vm.userId)
                .then(function(portfolio) {
                    _.forEach(portfolio, function(stock) {
                        vm.invTotal += stock.invTotalNumber;
                        vm.currentTotal += stock.currentTotalNumber;
                    });
                    if (vm.currentTotal >= vm.invTotal) {
                        vm.profit = vm.currentTotal - vm.invTotal;
                        vm.profitPercentage = numeral(vm.profit/vm.invTotal).format('0.00%');
                        vm.profit = numeral(vm.profit).format('$0,0.00');
                    } else {
                        vm.loss = vm.invTotal - vm.currentTotal;
                        vm.lossPercentage = numeral(vm.loss/vm.invTotal).format('0.00%');
                        vm.loss = numeral(vm.loss).format('$0,0.00');
                    }
                    vm.invTotal = numeral(vm.invTotal).format('$0,0.00');
                    vm.currentTotal = numeral(vm.currentTotal).format('$0,0.00');
                    $('#portfolioPanel').removeClass('loading');
                }, function(err) {
                    console.log(err);
                });
        }
        
        // Event Handler Declaration
        vm.update = update;

        // Event Handler Implementation
        function update(user) {
            UserService.updateUser(
                $rootScope.user._id,
                user
            ).then(function successCallback(response) {
                if (response.status === 200) {
                    $rootScope.user = user;
                    $location.path('/profile');
                    vm.showSuccessAlert = true;
                }
            });
        }
    }
})();
