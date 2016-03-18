'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($rootScope, $scope, FormService) {

        $scope.userforms = [];
        showAllFormsForUser();

        function showAllFormsForUser() {
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(function successCallback(forms){
                    $scope.userforms = forms.data;
                    delete $scope.selectedForm;
                    delete $scope.selectedFormIndex;
                });
        }

        // Event Handler Declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //Event Handler Implementation
        function addForm(form) {
            if (form.title) {
                FormService.createFormForUser($rootScope.user._id, form)
                    .then(function successCallback() {
                        showAllFormsForUser();
                    });
            }
        }

        function updateForm(form) {
            FormService.updateFormById($scope.selectedForm._id, form)
                .then(function successCallback() {
                    showAllFormsForUser();
                });
        }

        function deleteForm(form) {
            FormService.deleteFormById(form._id)
                .then(function successCallback() {
                    showAllFormsForUser();
                });
        }

        function selectForm(index) {
            $scope.selectedFormIndex = index;
            $scope.selectedForm = {
                _id: $scope.userforms[index]._id,
                title: $scope.userforms[index].title,
                userId: $scope.userforms[index].userId
            }
        }
    }
}());