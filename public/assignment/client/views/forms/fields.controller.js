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
        $scope.updateModel = updateModel;

        //Event Handler Implementation
        function updateModel() {
            FieldService.updateFields(formId, $scope.fields);
        }

        function addField(fieldType) {
            if (fieldType) {
                switch (fieldType) {
                    case 'SINGLE_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Text Field",
                                "type": "TEXT",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'MULTI_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Text Field",
                                "type": "TEXTAREA",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'DATE':
                        FieldService.createFieldForForm(formId, {
                                "_id": null,
                                "label": "New Date Field",
                                "type": "DATE"
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'DROPDOWN':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                                    {"label": "Option 1", "value": "OPTION_1"},
                                    {"label": "Option 2", "value": "OPTION_2"},
                                    {"label": "Option 3", "value": "OPTION_3"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'CHECKBOXES':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                    {"label": "Option A", "value": "OPTION_A"},
                                    {"label": "Option B", "value": "OPTION_B"},
                                    {"label": "Option C", "value": "OPTION_C"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    case 'RADIO':
                        FieldService.createFieldForForm(formId, {
                                "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                    {"label": "Option X", "value": "OPTION_X"},
                                    {"label": "Option Y", "value": "OPTION_Y"},
                                    {"label": "Option Z", "value": "OPTION_Z"}
                                ]
                            })
                            .then(function successCallback(response) {
                                $scope.fields = response.data.fields;
                            });
                        break;
                    default:
                        break;
                }
            }
        }

        function removeField(field) {
            FieldService.deleteFieldFromForm(formId, field._id)
                .then(function successCallback(response){
                    $scope.fields = response.data.fields;
                });
        }
    }
}());