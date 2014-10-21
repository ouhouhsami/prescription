angular
  .module('prescriptionApp')
  .factory('PrescriptionService', ['$http', 'localStorageService', 'uuid4',
    function($http, localStorageService, uuid4) {
      var self = this;
      var lsKeys = localStorageService.keys();
      self.prescriptions = [];
      for (var i = 0; i < lsKeys.length; i++) {
        self.prescriptions.push(localStorageService.get(lsKeys[i]));
      }

      self.prescriptions = localStorageService.keys();

      var _createPrescription = function() {
        var prescription = {
          uuid: uuid4.generate(),
          date: '',
          firstname: '',
          lastname: '',
          birthdate: '',
          interventionDate: '',
          intervention: '',
          prescriptorSenior: '',
          prescriptorIntern: '',
          birthWeight: '',
          currentWeight: '',
          supervisions: [],
          alimentations: [],
          drains: [],
          perfusions: [],
          compensations: [],
          analgesies4IR: [],
          analgesies: [],
          antibiotics: [],
          others: [],
          measures: [],
          todo: ''
        };
        return prescription;
      };

      self.prescription = {
        uuid: uuid4.generate(),
        date: '',
        firstname: '',
        lastname: '',
        birthdate: '',
        interventionDate: '',
        intervention: '',
        prescriptorSenior: '',
        prescriptorIntern: '',
        birthWeight: '',
        currentWeight: '',
        supervisions: [],
        alimentations: [],
        drains: [],
        perfusions: [],
        compensations: [],
        analgesies4IR: [],
        analgesies: [],
        antibiotics: [],
        others: [],
        measures: [],
        todo: ''
      };

      var supervisions;
      var alimentations;
      var drains;
      var perfusions;
      var compensations;
      var analgesies4IR;
      var analgesies;
      var antibiotics;
      var others;
      var measures;
      var prescriptorSeniors;
      var prescriptorInterns;

      var promise = $http.get('data/data.json').then(function(res) {
        supervisions = res.data.supervisions;
        alimentations = res.data.alimentations;
        drains = res.data.drains;
        perfusions = res.data.perfusions;
        compensations = res.data.compensations;
        analgesies4IR = res.data.analgesies4IR;
        analgesies = res.data.analgesies;
        antibiotics = res.data.antibiotics;
        others = res.data.others;
        measures = res.data.measures;
        prescriptorSeniors = res.data.prescriptorSeniors;
        prescriptorInterns = res.data.prescriptorInterns;
      });

      return {
        promise: promise,
        createPrescription: function() {
          self.prescription = _createPrescription();
          //localStorageService.set(self.prescription.uuid, self.prescription);
          return self.prescription;
        },
        updatePrescription: function(uuid) {
          self.prescription = localStorageService.get(uuid);
          return self.prescription;
        },
        getPrescription: function(uuid4) {
          if (uuid4) {
            return localStorageService.get(uuid4);
          } else {
            return self.prescription;
          }
        },
        getPrescriptions: function() {
          self.uuidPrescriptions = localStorageService.keys();
          self.prescriptions = [];
          self.uuidPrescriptions.forEach(function(uuid) {
            self.prescriptions.push(localStorageService.get(uuid));
          });
          return self.prescriptions;
        },
        setPrescription: function(uuid4) {
          var obj = localStorageService.get(uuid4);
          for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
              self.prescription[property] = obj[property];
            }
          }
        },
        removePrescription: function(uuid4) {
          localStorageService.remove(uuid4);
        },
        duplicatePrescription: function(uuid) {
          var obj = localStorageService.get(uuid);
          var uuid = uuid4.generate();
          obj.uuid = uuid;
          localStorageService.set(uuid, obj);
          return uuid;
        },
        savePrescription: function() {
          console.log("save", self.prescription.uuid, self.prescription);
          localStorageService.set(self.prescription.uuid, self.prescription);
          var obj = localStorageService.keys();
          for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
              self.prescriptions[property] = obj[property];
            }
          }
        },
        getOptions: function(param) {
          return eval(param); // ugly ugly
        },
        getLists: function(){
          return {
            supervisions: supervisions,
            alimentations: alimentations,
            drains: drains,
            perfusions: perfusions,
            compensations: compensations,
            analgesies4IR: analgesies4IR,
            analgesies: analgesies,
            antibiotics: antibiotics,
            others: others,
            measures: measures,
            prescriptorSeniors: prescriptorSeniors,
            prescriptorInterns: prescriptorInterns
          };
        }
      };
    }
  ]);
