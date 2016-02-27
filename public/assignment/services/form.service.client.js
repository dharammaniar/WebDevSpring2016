(function() {
    angular
        .module('FormBuilderApp')
        .factory('FormService', FormService);

    function FormService() {
        var forms = [
            {
                "_id": "000",
                "title": "Contacts",
                "userId": 123
            },
            {
                "_id": "010",
                "title": "ToDo",
                "userId": 123
            },
            {
                "_id": "020",
                "title": "CDs",
                "userId": 234
            }
        ];

        function createFormForUser(userId, form, callback) {
            _.extend(form, {
                _id: (new Date).getTime(),
                userId: userId
            });
            forms[forms.length] = form;

            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var formsFound = _.filter(forms, {
                userId: userId
            });

            callback(formsFound);
        }

        function deleteFormById(formId, callback) {
            _.remove(forms, function(form) {
                return form._id === formId;
            });

            callback(forms);
        }

        function updateFormById(formId, newForm, callback) {
            var formToUpdate = _.find(forms, {
                _id: formId
            });

            _.extend(formToUpdate, newForm);

            callback(formToUpdate);
        }

        return {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
    }
}());