'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('BlogController', BlogController);

    function BlogController($rootScope, $scope, BlogService) {

        $scope.userBlogs = [];
        showAllBlogsForUser();

        function showAllBlogsForUser() {
            BlogService.findAllBlogsForUser($rootScope.user._id, function(blogs){
                $scope.userBlogs = blogs;
                delete $scope.selectedBlog;
                delete $scope.selectedBlogIndex;
            });
        }

        // Event Handler Declaration
        $scope.addBlog = addBlog;
        $scope.updateBlog = updateBlog;
        $scope.deleteBlog = deleteBlog;
        $scope.selectBlog = selectBlog;

        //Event Handler Implementation
        function addBlog(blog) {
            if (blog.title && blog.description) {
                BlogService.createBlogForUser($rootScope.user._id, blog, showAllBlogsForUser);
            }
        }

        function updateBlog(blog) {
            BlogService.updateBlogById(blog._id, blog, showAllBlogsForUser);
        }

        function deleteBlog(blog) {
            BlogService.deleteBlogById(blog._id, showAllBlogsForUser);
        }

        function selectBlog(index) {
            $scope.selectedBlogIndex = index;
            $scope.selectedBlog = {
                _id: $scope.userBlogs[index]._id,
                title: $scope.userBlogs[index].title,
                description: $scope.userBlogs[index].description,
                userId: $scope.userBlogs[index].userId,
                dateCreated: $scope.userBlogs[index].dateCreated
            }
        }
    }
}());