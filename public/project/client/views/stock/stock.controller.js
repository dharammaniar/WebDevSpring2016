/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('StockController', StockController);

    function StockController($http, $sce, $routeParams, $rootScope, $location, StockService, UserService, RecommendationService) {
        var vm = this;

        vm.stockCode = $routeParams.code;

        vm.date = moment().format('MMM-DD');
        vm.indexValue = '0.0';
        vm.difference = '0.0';
        vm.percentage = '0.0';
        vm.high = '0.0';
        vm.low = '0.0';
        vm.volume = '0';

        vm.deliberatelyTrustDangerousSnippet = deliberatelyTrustDangerousSnippet;
        vm.addToPortfolio = addToPortfolio;
        vm.goToMessageBoard = goToMessageBoard;
        vm.sendRecommendation = sendRecommendation;

        init();

        function init() {

            if ($rootScope.user) {
                vm.users = [];
                UserService.findAllUsers()
                    .then(
                        function (response) {
                            vm.users = _.filter(response.data, function (user) {
                                if (user._id === $rootScope.user._id) {
                                    return false;
                                }
                                return user.type !== 'analyst';
                            });
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            }

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


                var chartData = [];
                var volumeData = [];
                if ($rootScope.user && $rootScope.user.type === 'analyst') {

                    _.forEach(response.data.dataset.data, function (day) {
                        chartData.push([
                            new Date(day[0]).getTime(),
                            day[1],
                            day[2],
                            day[3],
                            day[4]
                        ]);
                        volumeData.push([
                            new Date(day[0]).getTime(),
                            day[5]
                        ])
                    });

                    _.reverse(chartData);
                    _.reverse(volumeData);

                    $('#advancedChartContainer').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: vm.stockCode
                        },
                        yAxis: [{
                            labels: {
                                align: 'right',
                                x: -3
                            },
                            title: {
                                text: 'OHLC'
                            },
                            height: '60%',
                            lineWidth: 2
                        }, {
                            labels: {
                                align: 'right',
                                x: -3
                            },
                            title: {
                                text: 'Volume'
                            },
                            top: '65%',
                            height: '35%',
                            offset: 0,
                            lineWidth: 2
                        }],
                        series: [{
                            type: 'candlestick',
                            name: vm.stockCode,
                            data: chartData,
                            tooltip: {
                                valueDecimals: 2
                            }
                        }, {
                            type: 'column',
                            name: 'Volume',
                            data: volumeData,
                            yAxis: 1
                        }]
                    });
                }

                chartData = [];

                _.forEach(response.data.dataset.data, function (day) {
                    chartData.push([
                        new Date(day[0]).getTime(),
                        day[1]
                    ]);
                });

                _.reverse(chartData);

                $('#basicChartContainer').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: vm.stockCode
                    },
                    series: [{
                        name: vm.stockCode,
                        data: chartData,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });

            }, function errorCallback(response) {
                console.log(response);
            });
            fetchNews();
        }

        function deliberatelyTrustDangerousSnippet(text) {
            return $sce.trustAsHtml(text);
        }

        function addToPortfolio() {
            $rootScope.addToPortfolioCode = vm.stockCode;
            $location.path('/portfolio/' + $rootScope.user._id);
        }

        function goToMessageBoard() {
            $location.path('/stock/' + vm.stockCode + '/messageboard');
        }


        function sendRecommendation(recommendation) {
            var reco = {
                code: vm.stockCode,
                action: recommendation.action,
                target: recommendation.target,
                by: $rootScope.user._id
            };

            RecommendationService.addRecommendationToUserRecommendations(recommendation.user, reco)
                .then(
                    function (response) {
                        console.log(response);
                        $('#sendRecommendation').removeClass('btn-primary');
                        $('#sendRecommendation').addClass('btn-success');
                        $('#sendRecommendation').html('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Sent');

                        setTimeout(function () {
                            $('#sendRecommendation').removeClass('btn-success');
                            $('#sendRecommendation').addClass('btn-primary');
                            $('#sendRecommendation').html('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Send');
                        }, 2000);
                    },
                    function (err) {
                        console.log(err);
                    }
                );

        }

        function fetchNews() {
            $http.jsonp('https://ajax.googleapis.com/ajax/services/search/news?v=2.0&callback=JSON_CALLBACK&q=' + vm.stockCode)
                .then(function successCallback(response) {

                    if (response.data.responseStatus == 503) {
                        setTimeout(function () {
                            fetchNews();
                        }, 3000);
                    } else {
                        var results = response.data.responseData.results;
                        var news = [];
                        _.forEach(results, function (result) {
                            news.push({
                                title: result.titleNoFormatting,
                                content: result.content,
                                url: result.unescapedUrl,
                                imageUrl: result.image ? result.image.url : null,
                                date: moment(result.publishedDate).format('MMM-DD, YYYY')
                            })
                        });
                        vm.news = news;
                    }

                }, function errorCallback(response) {
                    console.log(response);
                });
        }
    }
})();
