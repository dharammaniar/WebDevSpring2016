'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    function FieldsController($rootScope, $routeParams, $scope, FieldService) {

        var formId = $routeParams.formId;

        init();

        function init() {
            FieldService.getFieldsForForm(formId)
                .then(function successCallback(response) {
                    $scope.fields = response.data;
                });
            console.log(formId);
        }

        // Event Handler Declaration
        $scope.addField = addField;
        $scope.removeField = removeField;

        //Event Handler Implementation
        function addField(fieldType) {

        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function successCallback(response){
                    $scope.fields = response.data.fields;
                });
        }
    }
}());