angular
.module('prescriptionApp')
.controller('PrescriptionListCtrl', ['$location', 'PrescriptionService', 'localStorageService',
  function($location, PrescriptionService, localStorageService) {
    var self = this;
    self.prescriptions = PrescriptionService.getPrescriptions();
    self.update = function(uuid, index) {
      PrescriptionService.setPrescription(uuid);
    };
    self.remove = function(uuid, index) {
      PrescriptionService.removePrescription(uuid);
      self.prescriptions = PrescriptionService.getPrescriptions();
    };
    self.duplicate = function(uuid, index) {
      var id = PrescriptionService.duplicatePrescription(uuid);
      $location.path('/edit/' + id);
    };
  }
  ]);
