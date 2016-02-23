(function(){
    angular
        .module('FormBuilderApp')
        .controller('MainController', MainController);

    function MainController($scope) {
        $scope.location = "MainController";
    }
})();
