/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('MessageBoardController', MessageBoardController);

    function MessageBoardController($http, $routeParams, $rootScope, StockService, MessageService, UserService) {
        var vm = this;

        vm.stockCode = $routeParams.code;

        vm.date = moment().format('MMM-DD');
        vm.indexValue = '0.0';
        vm.difference = '0.0';
        vm.percentage = '0.0';
        vm.high = '0.0';
        vm.low = '0.0';
        vm.volume = '0';

        vm.addMessage = addMessage;

        function init() {
            StockService.getStockByCode(vm.stockCode)
                .then(
                    function (response) {
                        vm.stock = response.data;
                    }
                );

            $http({
                method: 'GET',
                url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + vm.stockCode + '.json?auth_token=bbt3K2NScvyFC4f-trat'
            }).then(function successCallback(response) {
                vm.date = moment(response.data.dataset.data[0][0]).format('MMM-DD');
                vm.indexValue = response.data.dataset.data[0][4];
                vm.high = response.data.dataset.data[0][2];
                vm.low = response.data.dataset.data[0][3];
                vm.volume = numeral(Number(response.data.dataset.data[0][5])).format('0,0');

                var differenceValue = (response.data.dataset.data[0][1] - response.data.dataset.data[1][1]).toFixed(2);
                vm.difference = differenceValue;

                var percentage = ((differenceValue / response.data.dataset.data[1][1]) * 100).toFixed(2);
                vm.percentage = percentage + '%';
            }, function errorCallback(response) {
                console.log(response);
            });
            showAllMessagesForStock();
        }

        init();

        function showAllMessagesForStock() {
            vm.stockMessages = [];
            MessageService.findMessagesByStockCode(vm.stockCode)
                .then(
                    function (response) {
                        var messages = response.data,
                            stockMessages = [];
                        _.forEach(messages, function (message) {
                            UserService.findById(message.userId)
                                .then(function (response) {
                                    var user = response.data;
                                    _.extend(message, {
                                        userFirstName: user.firstName,
                                        userLastName: user.lastName,
                                        userId: user._id,
                                        timestamp: moment(message.timestamp).format('MM/DD/YYYY HH:mm:SS')
                                    });
                                    stockMessages.push(message);
                                    if (stockMessages.length === messages.length) {
                                        vm.stockMessages = _.sortBy(stockMessages, 'timestamp');
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                        });
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function addMessage(message) {
            _.extend(message, {
                userId: $rootScope.user._id,
                timestamp: Date.now
            });
            MessageService.addMessageToStockMessages(vm.stockCode, message)
                .then(function (response) {
                    $('#btn-input').val('');
                    showAllMessagesForStock();
                }, function (err) {
                    console.log(err);
                });
        }
    }
})();
