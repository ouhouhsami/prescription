angular
  .module('prescriptionApp', ['LocalStorageModule', 'uuid4', 'ngRoute'])
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
        controllerAs: 'ctrl',
        resolve: {
          'PrescriptionServiceData': function(PrescriptionService) {
            return PrescriptionService.promise;
          }
        }
      }).
      when('/edit/:prescriptionUUID', {
        templateUrl: 'partials/edit.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'PrescriptionServiceData': function(PrescriptionService) {
            return PrescriptionService.promise;
          }
        }
      }).
      when('/edit', {
        templateUrl: 'partials/edit.html',
        controller: 'MainCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'PrescriptionServiceData': function(PrescriptionService) {
            return PrescriptionService.promise;
          }
        }
      }).
      when('/print/:prescriptionUUID', {
        templateUrl: 'partials/print.html',
        controller: 'PrescriptionPrintCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'PrescriptionServiceData': function(PrescriptionService) {
            return PrescriptionService.promise;
          }
        }
      }).
      otherwise({
        redirectTo: '/edit'
      });
    }
  ]);
