angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/templates', {
        templateUrl: 'templates.html',
        controller: 'templatesCtrl'
      })
      .when('/new', {
        templateUrl: 'new.html',
        controller: 'newCtrl'
      })
      .otherwise({
        redirectTo: '/templates'
      });
  })

  .factory('Template', function() {

    var add = function() {
    };

    var remove = function() {
    };

    var edit = function() {
    };

    return {
      add: add,
      remove: remove
    };
  })
  .controller('newCtrl', function($scope, Template) {
    $scope.data = {};
    $scope.data.selected = null;
    $scope.editing = false;
    $scope.data.exercises = [{name: 'Deadlift', amount: '100x5x5'}, {name: 'Leg Curl', amount: '100x8x3'}];
    $scope.select = function(exercise) {
      if ($scope.data.selected === exercise) {
        $scope.data.selected = null;
      } else {
        $scope.data.selected = exercise;
      }
      console.log($scope.data.selected);
    }
    var findIndex = function() {
      for (var i = 0; i < $scope.data.exercises.length; i++) {
        if ($scope.data.exercises[i].name === $scope.data.selected.name) {
          return i;
        }
      }
    };

    $scope.add = function() {
      
    };
    $scope.remove = function() {
      var index = findIndex();
      $scope.data.exercises.splice(index,1);
      $scope.data.selected = null;
    };
    $scope.edit = function() {
      $scope.editing = !$scope.editing;
    };
    $scope.update = function() {
      console.log($scope.exercise);
    };
  })
  .controller('templatesCtrl', function($scope, Template) {
    
  });
  
