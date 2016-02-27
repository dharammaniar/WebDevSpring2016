(function (){
    angular
        .module('FormBuilderApp')
        .controller('FormController', FormController);

    function FormController($rootScope, $scope, FormService) {

        $scope.userforms = [];
        showAllFormsForUser();

        function showAllFormsForUser() {
            FormService.findAllFormsForUser($rootScope.user._id, function(forms){
                $scope.userforms = forms;
                delete $scope.selectedForm;
            });
        }

        // Event Handler Declaration
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        //Event Handler Implementation
        function addForm(form) {
            FormService.createFormForUser($rootScope.user._id, form, showAllFormsForUser);
        }

        function updateForm(form) {
            FormService.updateFormById($scope.selectedForm._id, form, showAllFormsForUser);
        }

        function deleteForm(form) {
            FormService.deleteFormById(form._id, showAllFormsForUser);
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