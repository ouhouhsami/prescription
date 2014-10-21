angular
    .module('prescriptionApp')
    .directive('retrieveObject', function() {
        function link(scope, element, attrs, ctrl, transclude) {
            var array = eval(attrs.array);
            var key = attrs.key;
            var value = attrs.value;
            var elmt = array.find(function(elmt, index, array) {
                if (elmt[key] == value) {
                    return elmt;
                }
                return false;
            });
            scope.object = elmt;
            transclude(scope, function(clone, scope) {
                element.append(clone);
            });
        }
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                key: '='
            },
            link: link
        };
    });
