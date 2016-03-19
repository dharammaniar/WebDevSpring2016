'use strict';

(function (){
    angular
        .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, modal, title) {

            $scope.title = title;
            $scope.modal = modal;

            if (modal.options) {
                var optionsString = null;
                _.forEach(modal.options, function (option) {
                    if (optionsString) {
                        optionsString = optionsString + "\n" + option.value + ":" + option.label;
                    } else {
                        optionsString = option.value + ":" + option.label;
                    }
                });

                $scope.modal.placeholder = optionsString;
            }

            $scope.ok = function(model) {
                var stringArray = model.placeholder.split('\n');
                var updatedOptions = [];
                _.forEach(stringArray, function(string) {
                     updatedOptions.push({
                         value: string.split(':')[0],
                         label: string.split(':')[1]
                     })
                });
                model.options = updatedOptions;
                $uibModalInstance.close(model);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });

    function FieldsController($uibModal, $routeParams, $scope, FieldService) {

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

        $scope.open = function (fieldType, field) {

            var modalInstance = null;
            var originalLabel = field.label,
                originalPlaceholder = field.placeholder;

            switch (fieldType) {
                case 'TEXT':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Single Line Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'EMAIL':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Email Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'TEXTAREA':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholder.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Multiple Lines Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'DATE':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelPlaceholderDate.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Date Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'OPTIONS':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Dropdown Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'CHECKBOX':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Checkbox Field'
                            },
                            modal: field
                        }
                    });
                    break;
                case 'RADIO':
                    modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'labelOptions.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        resolve: {
                            title: function() {
                                return 'Radio Button Field'
                            },
                            modal: field
                        }
                    });
                    break;
                default:
                    break;
            }

            modalInstance.result.then(function (model) {
                field.label = model.label;
                field.placeholder = model.placeholder;
                FieldService.updateFields(formId, $scope.fields);
                console.log(field);
            }, function () {
                field.label = originalLabel;
                field.placeholder = originalPlaceholder;
                console.log("Cancel Pressed");
            });

        };



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