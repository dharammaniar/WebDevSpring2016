(function(){
    angular
        .module('FormBuilderApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($scope) {
        $scope.location = "SidebarController";
    }
})();
