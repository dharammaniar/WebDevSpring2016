'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('BlogController', BlogController);

    function BlogController($rootScope, BlogService) {

        var vm = this;
        
        vm.userBlogs = [];
        showAllBlogsForUser();

        function showAllBlogsForUser() {
            BlogService.findAllBlogsForUser($rootScope.user._id)
                .then(function(blogs) {
                    vm.userBlogs = blogs.data;
                    delete vm.selectedBlog;
                    delete vm.selectedBlogIndex;
                });
        }

        // Event Handler Declaration
        vm.addBlog = addBlog;
        vm.updateBlog = updateBlog;
        vm.deleteBlog = deleteBlog;
        vm.selectBlog = selectBlog;

        //Event Handler Implementation
        function addBlog(blog) {
            if (blog.title && blog.description) {
                BlogService.createBlogForUser($rootScope.user._id, blog).then(showAllBlogsForUser);
            }
        }

        function updateBlog(blog) {
            BlogService.updateBlogById(blog._id, blog).then(showAllBlogsForUser);
        }

        function deleteBlog(blog) {
            BlogService.deleteBlogById(blog._id).then(showAllBlogsForUser);
        }

        function selectBlog(index) {
            vm.selectedBlogIndex = index;
            vm.selectedBlog = {
                _id: vm.userBlogs[index]._id,
                title: vm.userBlogs[index].title,
                description: vm.userBlogs[index].description,
                userId: vm.userBlogs[index].userId,
                dateCreated: vm.userBlogs[index].dateCreated
            }
        }
    }
}());