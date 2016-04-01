'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($rootScope, FormService) {

        var vm = this;

        vm.userforms = [];
        showAllFormsForUser();

        function showAllFormsForUser() {
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(function successCallback(forms){
                    vm.userforms = forms.data;
                    delete vm.selectedForm;
                    delete vm.selectedFormIndex;
                });
        }

        // Event Handler Declaration
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

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
            FormService.updateFormById(vm.selectedForm._id, form)
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
            vm.selectedFormIndex = index;
            vm.selectedForm = {
                _id: vm.userforms[index]._id,
                title: vm.userforms[index].title,
                userId: vm.userforms[index].userId
            }
        }
    }
}());