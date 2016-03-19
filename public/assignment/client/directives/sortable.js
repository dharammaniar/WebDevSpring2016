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
                    var temp = scope.fields[start];
                    scope.fields[start] = scope.fields[end];
                    scope.fields[end] = temp;
                    scope.$apply();
                    scope.updateModel();
                }
            }); }

        return {
            link: link
        }
    }
})();