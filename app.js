angular.module('app', ['ngRoute', 'ui.sortable'])
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
  .controller('newCtrl', function($scope) {
    $scope.data = {};
    $scope.selected = null;
    $scope.adding = false;
    $scope.added = {};
    $scope.editing = false;
    $scope.edited = {};
    $scope.sampling = false;
    $scope.samples = {};

    $scope.samples = {
      list: ['Leg Day', 'Push Day', 'Pull Day'],
      list2: [
        {name: 'Leg Day', exercises: [
          {name: 'Deadlift', amount: '100x5x5'}, 
          {name: 'Leg Curl', amount: '100x8x3'}, 
          {name: 'Leg Press', amount: '100x5x5'}, 
          {name: 'Calf Raise', amount: '100x8x3'}
          ]},
        {name: 'Push Day', exercises: [
          {name: 'Bench Press', amount: '100x5x5'}, 
          {name: 'Incline Bench Press', amount: '100x8x3'}, 
          {name: 'Military Press', amount: '100x5x5'}, 
          {name: 'Triceps Pushdown', amount: '100x8x3'}
        ]},
        {name: 'Pull Day', exercises: [
          {name: 'Deadlift', amount: '100x5x5'}, 
          {name: 'Lat Pulldown', amount: '100x5x5'}, 
          {name: 'Dumbbell Rows', amount: '100x8x3'}, 
          {name: 'Dumbbell Curls', amount: '100x8x3'}
        ]}
      ]
    };

    $scope.data = {
      name:'Leg Day',
      exercises: [{name: 'Deadlift', amount: '100x5x5'}, 
        {name: 'Leg Curl', amount: '100x8x3'}, 
        {name: 'Leg Press', amount: '100x5x5'}, 
        {name: 'Calf Raise', amount: '100x8x3'}]
    }; 
    
    $scope.select = function(exercise) {
      if ($scope.selected === exercise) {
        $scope.selected = null;
        $scope.edited = {};
      } else {
        $scope.selected = exercise;
        $scope.edited.name = exercise.name;
        $scope.edited.amount = exercise.amount;
      }
      console.log($scope.selected);
    }
    var findIndex = function() {
      for (var i = 0; i < $scope.data.exercises.length; i++) {
        if ($scope.data.exercises[i].name === $scope.selected.name) {
          return i;
        }
      }
    };
    $scope.add = function() {
      $scope.data.exercises.push($scope.data.added);
      $scope.data.added = {};
      console.log($scope.data.exercises);
    };
    $scope.remove = function() {
      var index = findIndex();
      $scope.data.exercises.splice(index,1);
      $scope.selected = null;
    };
    $scope.toggleEdit = function() {
      $scope.editing = !$scope.editing;
    };
    $scope.edit = function() {
      $scope.selected.name = $scope.edited.name;
      $scope.selected.amount = $scope.edited.amount;
      $scope.edited = {};
      $scope.toggleEdit();
    };
    $scope.loadSample = function(workout) {
      console.log(workout);
      $scope.data = workout;
      $scope.sampling = !$scope.sampling;
    };
  })
  .controller('templatesCtrl', function($scope, Template) {
    
  });
  
