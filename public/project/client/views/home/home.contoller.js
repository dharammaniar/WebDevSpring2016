'use strict';

(function () {
    angular
        .module('FormBuilderApp')
        .controller('HomeController', HomeController);

    function HomeController($rootScope, $http, $sce) {
        
        var vm = this;
        
        vm.indexValue = '0.0';
        vm.difference = '0.0';
        vm.percentage = '0.0';

        //vm.news = [];

        init();

        vm.deliberatelyTrustDangerousSnippet = function(text) {
            return $sce.trustAsHtml(text);
        };

        function init() {
            $http({
                method: 'GET',
                url: 'https://www.quandl.com/api/v3/datasets/NASDAQOMX/COMP.json?auth_token=bbt3K2NScvyFC4f-trat'
            }).then(function successCallback(response) {
                vm.indexValue = response.data.dataset.data[0][1];
                vm.high = response.data.dataset.data[0][2];
                vm.low = response.data.dataset.data[0][3];

                var differenceValue = (response.data.dataset.data[0][1] - response.data.dataset.data[1][1]).toFixed(2);
                vm.difference = differenceValue;

                var percentage = ((differenceValue/response.data.dataset.data[1][1])*100).toFixed(2);
                vm.percentage = '(' + percentage + '%)';

                if (differenceValue >= 0 ) {

                } else if (differenceValue < 0) {

                }

                var chartData = [];
                _.forEach(response.data.dataset.data, function(day) {
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

        function fetchNews() {
            $http.jsonp('https://ajax.googleapis.com/ajax/services/search/news?v=2.0&topic=b&callback=JSON_CALLBACK')
                .then(function successCallback(response) {

                    if(response.data.responseStatus == 503) {
                        setTimeout(function(){
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
                                imageUrl: result.image ? result.image.url : null
                            })
                        });
                        vm.news = news;
                    }

                }, function errorCallback(response) {
                    console.log(response);
                });
        }
    }
}());