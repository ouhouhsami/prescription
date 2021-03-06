angular.module('prescriptionApp', ['LocalStorageModule', 'uuid4', 'ngRoute'])
  .run(
    function($rootScope, $route, $location, $routeParams) {
      $rootScope.$on('$routeChangeSuccess',
        function(e, current, pre) {
          $rootScope.originalPath = $route.current.$$route.originalPath;
        }
      );
    })
  .config(['localStorageServiceProvider',
    function(localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('ls');
    }
  ])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/open', {
        templateUrl: 'partials/open.html',
        controller: 'PrescriptionListCtrl',
        controllerAs: 'ctrl'
      }).
      when('/edit/:prescriptionUUID', {
        templateUrl: 'partials/edit.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      }).
      when('/edit', {
        templateUrl: 'partials/edit.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl'
      }).
      otherwise({
        redirectTo: '/edit'
      });
    }
  ])
  .controller('MainCtrl', ['$scope', '$routeParams', 'PrescriptionService',
    function($scope, $routeParams, PrescriptionService) {
      var self = this;
      if ($routeParams.prescriptionUUID) {
        self.prescription = PrescriptionService.updatePrescription($routeParams.prescriptionUUID);
      } else {
        self.prescription = PrescriptionService.createPrescription();
      }
      self.prescriptorSeniors = [{
        label: "Pr MARTELLI",
        id: 1
      }, {
        label: "Dr BRANCHEREAU",
        id: 2
      }, {
        label: "Dr DERGUINI",
        id: 3
      }, {
        label: "Dr DE DREUZY",
        id: 4
      }, {
        label: "Dr FOUQUET",
        id: 5
      }, {
        label: "Pr GAUTHIER",
        id: 6
      }, {
        label: "Dr GOLDSZMIDT",
        id: 7
      }, {
        label: "Dr HAUTEFORT",
        id: 8
      }, {
        label: "Dr MONTUPET",
        id: 9
      }, {
        label: "Dr GUERIN",
        id: 10
      }, {
        label: "Dr DE LAMBERT",
        id: 11
      }, {
        label: "Dr BOUBNOVA",
        id: 12
      }];

      self.prescriptorInterns = [{
        label: "KOHAUT",
        id: 1
      }, {
        label: "TABONE",
        id: 2
      }, {
        label: "KHESRANI",
        id: 3
      }, {
        label: "MONTARULI",
        id: 4
      }];

      self.save = function() {
        console.log('save');
        PrescriptionService.savePrescription();
      };

      self.create = function() {

      };

      self.print = function() {

      };
    }
  ])
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
  ])
  .controller('PrescriptionCtrl', ['PrescriptionService',
    function(PrescriptionService) {
      var self = this;
      self.prescription = PrescriptionService.getPrescription();

    }
  ])
  .controller('PrescriptionListCtrl', ['PrescriptionService', 'localStorageService',
    function(PrescriptionService, localStorageService) {
      var self = this;
      self.prescriptions = PrescriptionService.getPrescriptions();
      self.update = function(item, index) {
        PrescriptionService.setPrescription(item);
      };
      self.remove = function(item, index) {
        PrescriptionService.removePrescription(item);
        self.prescriptions = PrescriptionService.getPrescriptions();
      };
    }
  ])

.factory('PrescriptionService', ['localStorageService', 'uuid4',
  function(localStorageService, uuid4) {
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
        supervisions: [{
          id: 1
        }],
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
      console.log(prescription.uuid);
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
      supervisions: [{
        id: 1
      }],
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

    var supervisions = [{
      id: 0,
      label: 'Pouls,FR,SaO2,T,PA/4h'
    }, {
      id: 1,
      label: 'Pouls,FR,SaO2,T,PA/8h'
    }, {
      id: 2,
      label: 'OPS ou EVA/ 8h'
    }, {
      id: 3,
      label: 'Dextro /12h'
    }, {
      id: 4,
      label: 'Hemocue /12h'
    }, {
      id: 5,
      label: 'SG / 8 h  et/ou Drain / 8h'
    }, {
      id: 6,
      label: 'Diurèse / 24 h'
    }, {
      id: 7,
      label: 'Poids 1x/j'
    }, {
      id: 8,
      label: 'Ingestas 1x/j'
    }, {
      id: 9,
      label: 'Scope'
    }, {
      id: 10,
      label: 'Kasai : si T°>38,5 ou< 36 faire nfs, crp, pct, hémoc,bhc,ecbu et Tel IDG 14651'
    }, {
      id: 11,
      label: 'Autre',
      isOther: true
    }];

    var alimentations = [{
      id: 0,
      label: "Boisson"
    }, {
      id: 1,
      label: "Normale"
    }, {
      id: 2,
      label: "BYC"
    }, {
      id: 3,
      label: "A jeun"
    }, {
      id: 4,
      label: "Diététique"
    }, {
      id: 5,
      label: "Lait 1er âge"
    }, {
      id: 6,
      label: "Peptijunior"
    }, {
      id: 7,
      label: "Allaitement maternel"
    }, {
      id: 8,
      label: "NEDC"
    }, {
      id: 9,
      label: "Enrichissement Maltodextridine"
    }, {
      id: 10,
      label: "Enrichissement DM"
    }, {
      id: 11,
      label: "Autre",
      isOther: true
    }];
    var drains = [{
      id: 1,
      label: "Sonde nasogastrique au sac"
    }, {
      id: 2,
      label: "Sonde nasogastrique déclive"
    }, {
      id: 3,
      label: "Sonde nasogastrique aspiration -20 cmH2O"
    }, {
      id: 4,
      label: "Ablation sonde nasogastrique"
    }, {
      id: 5,
      label: "Mobilisation lame/drain"
    }, {
      id: 6,
      label: "Ablation lame/drain"
    }, {
      id: 7,
      label: "Ablation sonde urinaire"
    }, {
      id: 8,
      label: "other",
      other: true
    }];
    var perfusions = [{
      id: 1,
      label: "B 46 en ml/h"
    }, {
      id: 2,
      label: "Parentérale (cf protocole )"
    }, {
      id: 3,
      label: "other",
      other: true
    }];
    var compensations = [{
      id: 1,
      label: "SG vol/vol ttes les 4 h par Ringer Lactate"
    }, {
      id: 2,
      label: "Drain biliaire vol/vol ttes les 4 h par eau de Vichy"
    }, {
      id: 3,
      label: "other",
      other: true
    }];
    var analgesies4IR = [{
      id: 1,
      label: "PERFALGAN"
    }, {
      id: 2,
      label: "NUBAIN"
    }, {
      id: 3,
      label: "PCA Morphine"
    }, {
      id: 4,
      label: "HYPNOVEL IR"
    }, {
      id: 5,
      label: "Autre",
      other: true
    }];
    var analgesies = [{
      id: 1,
      label: "Si EVA ≥ 3 ou EVENDOL ≥ 4 donner DOLIPRANE"
    }, {
      id: 2,
      label: "CODENFAN"
    }, {
      id: 3,
      label: "KALINOX"
    }, {
      id: 4,
      label: "SPASFON"
    }, {
      id: 5,
      label: "Autre",
      other: true
    }];
    var antibiotics = [{
      id: 1,
      label: "AUGMENTIN PO"
    }, {
      id: 2,
      label: "BACTRIM PO"
    }, {
      id: 3,
      label: "CLAMOXYL PO"
    }, {
      id: 4,
      label: "ORACILLINE PO"
    }, {
      id: 5,
      label: "OROKEN PO"
    }, {
      id: 6,
      label: "AUGMENTIN IV"
    }, {
      id: 7,
      label: "CLAFORAN IV"
    }, {
      id: 8,
      label: "CLAMOXYL IV"
    }, {
      id: 9,
      label: "GENTA IV"
    }, {
      id: 10,
      label: "PENICILLINE IV"
    }, {
      id: 11,
      label: "ROCEPHINE IV"
    }, {
      id: 12,
      label: "TAZOCILLINE IV"
    }, {
      id: 13,
      label: "TIENAM IV"
    }, {
      id: 14,
      label: "Autre",
      other: true
    }];
    var others = [{
      id: 1,
      label: "DITROPAN"
    }, {
      id: 2,
      label: "ZOPHREN"
    }, {
      id: 3,
      label: "MOTILIUM"
    }, {
      id: 4,
      label: "MOPRAL"
    }, {
      id: 5,
      label: "INEXIUM"
    }, {
      id: 6,
      label: "UVESTEROL"
    }, {
      id: 7,
      label: "VITAMINE K1"
    }, {
      id: 8,
      label: "LOVENOX"
    }, {
      id: 9,
      label: "OXYGENE lunettes"
    }, {
      id: 10,
      label: "RIFAMYCINE collyre"
    }, {
      id: 11,
      label: "Autre",
      other: true
    }];
    var measures = [{
      id: 1,
      label: "Isolement"
    }, {
      id: 2,
      label: "Pansements : irrigation…"
    }, {
      id: 3,
      label: "Décubitus strict"
    }, {
      id: 4,
      label: "Mobilisation"
    }, {
      id: 5,
      label: "Fauteuil"
    }, {
      id: 6,
      label: "Promenade dans le service"
    }, {
      id: 7,
      label: "Maison de l'enfant"
    }, {
      id: 8,
      label: "Kine respiratoire"
    }, {
      id: 9,
      label: "Psychomotricienne"
    }, {
      id: 10,
      label: "Autre",
      other: true
    }];

    return {
      createPrescription: function(){
        self.prescription = _createPrescription();
        return self.prescription;
      },
      updatePrescription: function(uuid){
        self.prescription = localStorageService.get(uuid);
        return self.prescription;
      },
      getPrescription: function(uuid4) {
        if (uuid4) {
          return localStorageService.get(uuid4);
        }
        else{
          return self.prescription;
        }
      },
      getPrescriptions: function() {
        self.uuidPrescriptions = localStorageService.keys();
        self.prescriptions = [];
        self.uuidPrescriptions.forEach(function(uuid){
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
      }
    };
  }
]);
