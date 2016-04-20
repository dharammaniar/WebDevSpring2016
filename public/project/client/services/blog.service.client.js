/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .factory('BlogService', BlogService);

    function BlogService($http) {
        return {
            findBlogById: findBlogById,
            findAllBlogs: findAllBlogs,
            findAllBlogsForUser: findAllBlogsForUser,
            deleteBlog: deleteBlog,
            createBlog: createBlog,
            updateBlog: updateBlog
        };

        function findBlogById(blogId) {
            return $http.get('/api/project/blog/' + blogId);
        }

        function findAllBlogs() {
            return $http.get('/api/project/blog');
        }

        function findAllBlogsForUser(userId) {
            return $http.get('/api/project/user/' + userId + '/blog');
        }

        function deleteBlog(blogId) {
            return $http.delete('/api/project/blog/' + blogId);
        }

        function createBlog(blog) {
            return $http.post('/api/project/blog', blog);
        }

        function updateBlog(blogId, blog) {
            return $http.put('/api/project/blog/' + blogId, blog);
        }
    }
})();