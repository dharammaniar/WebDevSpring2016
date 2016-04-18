/**
 * @author dharam
 */
'use strict';
(function(){
    angular
        .module('PortManApp')
        .controller('BlogsController', BlogsController);

    function BlogsController($location, $routeParams, $sce, BlogService, UserService) {
        var vm = this;
        vm.blogs = [];

        vm.editBlog = editBlog;
        vm.deleteBlog = deleteBlog;

        vm.deliberatelyTrustDangerousSnippet = function(text) {
            return $sce.trustAsHtml(text);
        };

        if ($routeParams.userId) {
            vm.isMyBlogs = true;
            showBlogsForUser($routeParams.userId);
        } else {
            vm.isMyBlogs = false;
            showAllBlogs();
        }

        function showBlogsForUser(userId) {
            BlogService.findAllBlogsForUser(userId)
                .then(
                    function(response) {
                        processAndDisplayBlogs(response.data);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function showAllBlogs() {
            BlogService.findAllBlogs()
                .then(
                    function(response) {
                        processAndDisplayBlogs(response.data);
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }

        function processAndDisplayBlogs(input) {
            var blogs = [];
            vm.blogs = blogs;
            _.forEach(input, function(blog) {
                UserService.findById(blog.userId)
                    .then(
                        function(userResponse) {
                            var user = userResponse.data;
                            var title = (blog.title.length > 40) ? _.truncate(blog.title, {'length': 40}) : blog.title;
                            var text = blog.text;
                            _.extend(blog, {
                                createdBy: user,
                                timestamp: moment(blog.timestamp).format('MM/DD/YYYY'),
                                title: title,
                                text: text
                            });
                            blogs.push(blog);
                            if (blogs.length === input.length) {
                                vm.blogs = blogs;
                                console.log(blogs);
                            }
                        },
                        function(err) {
                            console.log(err);
                        }
                    );
            });
        }

        function editBlog(blog) {
            $location.path('/editBlog/'+blog._id);
        }
        
        function deleteBlog(blog) {
            BlogService.deleteBlog(blog._id)
                .then(
                    function(response) {
                        showBlogsForUser($routeParams.userId);
                    },
                    function(err) {
                        console.log(err);
                    }
                )
        }
    }
})();
