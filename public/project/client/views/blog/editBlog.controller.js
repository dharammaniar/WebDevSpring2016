/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('EditBlogController', EditBlogController);

    function EditBlogController($location, $rootScope, $routeParams, BlogService) {
        var vm = this;
        var blogId = $routeParams.blogId;

        vm.saveBlog = saveBlog;
        vm.cancel = cancel;

        function init() {
            BlogService.findBlogById(blogId)
                .then(
                    function (response) {
                        vm.blog = response.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        init();

        function saveBlog(blog) {
            _.extend(blog, {
                userId: $rootScope.user._id
            });
            BlogService.updateBlog(blogId, blog)
                .then(
                    function (response) {
                        $location.path('/blog/' + blogId);
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function cancel() {
            $location.path('/blogs');
        }
    }
})();
