angular
  .module('prescriptionApp')
  .controller('PrescriptionPrintCtrl', ['$routeParams', 'PrescriptionService',
    function($routeParams, PrescriptionService) {
      var self = this;
      self.prescription = PrescriptionService.getPrescription($routeParams.prescriptionUUID);
      self.lists = PrescriptionService.getLists();
    }
  ]);
