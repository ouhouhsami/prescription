angular
  .module('prescriptionApp')
  .controller('PrescriptionPrintCtrl', ['$routeParams', 'PrescriptionService',
    function($routeParams, PrescriptionService) {
      var self = this;
      self.prescription = PrescriptionService.getPrescription($routeParams.prescriptionUUID);
      self.prescriptorSeniors = PrescriptionService.getOptions('prescriptorSeniors');
      self.prescriptorSenior = PrescriptionService.getOptions('prescriptorSeniors').find(function(element, index, array) {
        var id = self.prescription.prescriptorSenior;
        if (element.id == id) {
          return element;
        }
        return false;
      });
    }
  ]);
