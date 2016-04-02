'use strict';
(function (){
    angular
        .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    angular
        .module('FormBuilderApp')
        .controller('ModalInstanceCtrl', function ($uibModalInstance, modal, title) {
            var vm = this;

            vm.title = title;
            vm.modal = modal;

            if (vm.modal.options.length > 0) {
                var optionsString = null;
                _.forEach(vm.modal.options, function (option) {
                    if (optionsString) {
                        optionsString = optionsString + "\n" + option.value + ":" + option.label;
                    } else {
                        optionsString = option.value + ":" + option.label;
                    }
                });

                vm.modal.options = optionsString;
            }

            vm.ok = function(model) {
                if (model.options.length > 0) {
                    var stringArray = model.options.split('\n');
                    var updatedOptions = [];
                    _.forEach(stringArray, function (string) {
                        updatedOptions.push({
                            value: string.split(':')[0],
                            label: string.split(':')[1]
                        })
                    });
                    model.options = updatedOptions;
                }
                $uibModalInstance.close(model);
            };

            vm.cancel = function() {
                $uibModalInstance.dismiss();
            };
        });

    function FieldsController($uibModal, $routeParams, FieldService) {
        var vm = this;

        var formId = $routeParams.formId;

        init();

        function init() {
            FieldService.getFieldsForForm(formId)
                .then(function successCallback(response) {
                    vm.fields = response.data;
                });
        }

        // Event Handler Declaration
        vm.addField = addField;
        vm.removeField = removeField;
        vm.updateModel = updateModel;

        vm.open = function (fieldType, field) {

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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
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
                        },
                        controllerAs: 'popupModel'
                    });
                    break;
                default:
                    break;
            }

            modalInstance.result.then(function (model) {
                field.label = model.label;
                field.placeholder = model.placeholder;
                FieldService.updateFields(formId, vm.fields);
            }, function () {
                field.label = originalLabel;
                field.placeholder = originalPlaceholder;
                console.log("Cancel Pressed");
            });

        };

        //Event Handler Implementation
        function updateModel() {
            FieldService.updateFields(formId, vm.fields);
        }

        function addField(fieldType) {
            if (fieldType) {
                switch (fieldType) {
                    case 'SINGLE_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Text Field",
                                "type": "TEXT",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'MULTI_LINE_TEXT':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Text Field",
                                "type": "TEXTAREA",
                                "placeholder": "New Field"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'DATE':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Date Field",
                                "type": "DATE"
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'DROPDOWN':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Dropdown", "type": "OPTIONS", "options": [
                                    {"label": "Option 1", "value": "OPTION_1"},
                                    {"label": "Option 2", "value": "OPTION_2"},
                                    {"label": "Option 3", "value": "OPTION_3"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'CHECKBOXES':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                                    {"label": "Option A", "value": "OPTION_A"},
                                    {"label": "Option B", "value": "OPTION_B"},
                                    {"label": "Option C", "value": "OPTION_C"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
                            });
                        break;
                    case 'RADIO':
                        FieldService.createFieldForForm(formId, {
                                "label": "New Radio Buttons", "type": "RADIOS", "options": [
                                    {"label": "Option X", "value": "OPTION_X"},
                                    {"label": "Option Y", "value": "OPTION_Y"},
                                    {"label": "Option Z", "value": "OPTION_Z"}
                                ]
                            })
                            .then(function successCallback(response) {
                                vm.fields = response.data.fields;
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
                    if (response.status === 200) {
                        _.remove(vm.fields, {
                            _id: field._id
                        })
                    }
                });
        }
    }
}());