angular
    .module('prescriptionApp')
    .directive('retrieveObjectFromKeyValue', function() {
        function link(scope, element, attrs) {
            scope.name = 'Jeff';
            /*
            var array = eval(attrs.array);
            var key = attrs.key;
            var value = attrs.value;
            var elmt = array.find(function(elmt, index, array) {
                if (elmt[key] == value) {
                    return elmt;
                }
                return false;
            });
            element.text(elmt.label);*/
        }
        return {
            restrict: 'E',
            transclude: true,
            scope: {
            },
            link: link
        };
    });
