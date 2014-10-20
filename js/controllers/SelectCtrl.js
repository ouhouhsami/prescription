angular.module('prescriptionApp')
.controller('SelectCtrl', ['$scope', 'PrescriptionService',
    function($scope, PrescriptionService) {

      var self = this;

      $scope.setOptions = function(param, hasPosology) {
        self.param = param;
        self.options = PrescriptionService.getOptions(param);
        self.selected = PrescriptionService.getPrescription()[param];
        if (hasPosology) self.hasPosology = true;
      };

      $scope.isOther = function(id) {
        if (self.options[id].isOther) {
          return true;
        } else {
          return false;
        }
      };

      self.add = function() {
        self.selected.push({
          id: 0
        });
      };
      self.update = function(item, index) {
        self.selected[index] = item;
      };
      self.updateOther = function(item, index) {
        self.selected[index]['otherOption'] = item.otherOption;
      };
      self.updatePosology = function(item, index) {
        self.selected[index]['posology'] = item.posology;
      };
      self.remove = function(item, index) {
        self.selected.splice(index, 1);
      };

    }
  ]);
