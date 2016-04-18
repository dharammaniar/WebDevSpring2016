/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('CreateBlogController', CreateBlogController);

    function CreateBlogController($location, $rootScope, BlogService) {
        var vm = this;

        vm.saveBlog = saveBlog;
        vm.cancel = cancel;

        function saveBlog(blog) {
            _.extend(blog, {
                userId: $rootScope.user._id
            });
            BlogService.createBlog(blog)
                .then(
                    function(response) {
                        $location.path('/blog/'+response.data._id);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function cancel() {
            $location.path('/blogs');
        }
    }
})();
