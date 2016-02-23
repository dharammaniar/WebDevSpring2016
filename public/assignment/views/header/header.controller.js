(function(){
    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($scope) {
        $scope.location = "HeaderController";
    }
})();
