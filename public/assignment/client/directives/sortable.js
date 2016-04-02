/**
 * Created by dharam on 3/18/2016.
 */
(function(){
    angular
        .module('dmSortable', [])
        .directive("dmSortable", dmSortable);

    function dmSortable() {
        var start = null;
        var end = null;
        function link(scope, element, attributes) {
            var dmAxis = attributes.dmAxis;
            $(element).sortable({
                axis: dmAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                    console.log(ui.item);
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    console.log(ui.item);
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();
                    scope.model.updateModel();
                }
            }); }

        return {
            link: link
        }
    }
})();