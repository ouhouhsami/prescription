angular.module('prescriptionApp')
.controller('MainCtrl', ['$location', '$scope', '$routeParams', 'PrescriptionService',
  function($location, $scope, $routeParams, PrescriptionService) {
    var self = this;
    if ($routeParams.prescriptionUUID) {
      self.prescription = PrescriptionService.updatePrescription($routeParams.prescriptionUUID);
    } else {
      self.prescription = PrescriptionService.createPrescription();
    }

    self.prescriptorSeniors = PrescriptionService.getOptions('prescriptorSeniors');
    self.prescriptorInterns = PrescriptionService.getOptions('prescriptorInterns');

    self.save = function() {
      console.log(self.prescription.date)
      PrescriptionService.savePrescription();
    };

    self.create = function() {
      PrescriptionService.createPrescription();
    };

    self.duplicate = function(){
      var id = PrescriptionService.duplicatePrescription(self.prescription.uuid);
      $location.path('/edit/'+id);
    };

    self.print = function() {
      $location.path('/print/'+self.prescription.uuid);
    };
  }
  ]);
