'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('BlogService', BlogService);

    function BlogService($http) {

        function createBlogForUser(userId, blog) {
            return $http.post('/api/project/blog/' + userId, blog);
        }

        function findAllBlogsForUser(userId) {
            return $http.get('/api/project/blog/' + userId);
        }

        function deleteBlogById(blogId) {
            return $http.delete('/api/project/blog/' + blogId);
        }

        function updateBlogById(blogId, updatedBlog) {
            return $http.put('/api/project/blog/' + blogId, updatedBlog);
        }

        return {
            createBlogForUser: createBlogForUser,
            findAllBlogsForUser: findAllBlogsForUser,
            deleteBlogById: deleteBlogById,
            updateBlogById: updateBlogById
        };
    }
}());