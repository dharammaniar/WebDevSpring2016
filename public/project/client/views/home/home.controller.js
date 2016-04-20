/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('HomeController', HomeController);

    function HomeController($http, $sce) {
        var vm = this;

        vm.date = moment().format('MMM-DD');
        vm.indexValue = '0.0';
        vm.difference = '0.0';
        vm.percentage = '0.0';
        vm.high = '0.0';
        vm.low = '0.0';
        vm.totalMarketValue = '0';

        vm.deliberatelyTrustDangerousSnippet = deliberatelyTrustDangerousSnippet;

        function init() {
            $http({
                method: 'GET',
                url: 'https://www.quandl.com/api/v3/datasets/NASDAQOMX/COMP.json?auth_token=bbt3K2NScvyFC4f-trat'
            }).then(function successCallback(response) {
                vm.date = moment(response.data.dataset.data[0][0]).format('MMM-DD');
                vm.indexValue = response.data.dataset.data[0][1];
                vm.high = response.data.dataset.data[0][2];
                vm.low = response.data.dataset.data[0][3];
                vm.totalMarketValue = numeral(Number(response.data.dataset.data[0][4])).format('$0,0');

                var differenceValue = (response.data.dataset.data[0][1] - response.data.dataset.data[1][1]).toFixed(2);
                vm.difference = differenceValue;

                var percentage = ((differenceValue / response.data.dataset.data[1][1]) * 100).toFixed(2);
                vm.percentage = percentage + '%';

                var chartData = [];
                _.forEach(response.data.dataset.data, function (day) {
                    chartData.push([
                        new Date(day[0]).getTime(),
                        day[1]
                    ]);
                });

                _.reverse(chartData);

                $('#nasdaqContainer').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: 'NASDAQ'
                    },
                    series: [{
                        name: 'NASDAQ',
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

        init();

        function deliberatelyTrustDangerousSnippet(text) {
            return $sce.trustAsHtml(text);
        }

        function fetchNews() {
            $http.jsonp('https://ajax.googleapis.com/ajax/services/search/news?v=2.0&topic=b&callback=JSON_CALLBACK')
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
