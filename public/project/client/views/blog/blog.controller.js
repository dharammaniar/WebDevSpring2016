/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('BlogController', BlogController);

    function BlogController($routeParams, $sce, BlogService) {
        var vm = this;
        var blogId = $routeParams.blogId;

        vm.deliberatelyTrustDangerousSnippet = function(text) {
            return $sce.trustAsHtml(text);
        };

        BlogService.findBlogById(blogId)
            .then(
                function(response) {
                    vm.blog = response.data;
                },
                function(err) {
                    console.log(err);
                }
            );
    }
})();
