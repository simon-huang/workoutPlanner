angular.module('app', ['ngRoute', 'ui.sortable'])
  .config(function ($routeProvider) {
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
  .factory('Template', function () {
    var exer
    var add = function () {
    };
    return {
      add: add
    };
  })
  .controller('newCtrl', function ($scope, $http, $location) {
    $scope.data = {};
    $scope.data.name = "";
    $scope.data.exercises = [];
    $scope.selected = null;
    $scope.adding = false;
    $scope.added = { name: null, amount: null };
    $scope.editing = false;
    $scope.edited = {};
    $scope.sampling = false;
    $scope.samples = {};

    $scope.samples = {
      list: ['Leg Day', 'Push Day', 'Pull Day'],
      list2: [
        {
          name: 'Leg Day', exercises: [
            { name: 'Squats', amount: '5x5' },
            { name: 'Leg Curl', amount: '3x10' },
            { name: 'Leg Press', amount: '3x10' },
            { name: 'Calf Raise', amount: '3x10' }
          ]
        },
        {
          name: 'Push Day', exercises: [
            { name: 'Bench Press', amount: '5x5' },
            { name: 'Incline Bench Press', amount: '3x8' },
            { name: 'Military Press', amount: '3x8' },
            { name: 'Triceps Pushdown', amount: '3x10' }
          ]
        },
        {
          name: 'Pull Day', exercises: [
            { name: 'Deadlift', amount: '5x5' },
            { name: 'Lat Pulldown', amount: '3x10' },
            { name: 'Dumbbell Rows', amount: '3x10' },
            { name: 'Dumbbell Curls', amount: '3x10' }
          ]
        }
      ]
    };

    $scope.data = {
      name: 'New Workout',
      exercises: []
    };

    $scope.select = function (exercise) {
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
    var findIndex = function () {
      for (var i = 0; i < $scope.data.exercises.length; i++) {
        if ($scope.data.exercises[i].name === $scope.selected.name) {
          return i;
        }
      }
    };
    $scope.add = function () {
      $scope.data.exercises.push($scope.data.added);
      $scope.data.added = {};
      console.log($scope.data.exercises);
    };
    $scope.remove = function () {
      var index = findIndex();
      $scope.data.exercises.splice(index, 1);
      $scope.selected = null;
    };
    $scope.toggleEdit = function () {
      $scope.editing = !$scope.editing;
    };
    $scope.edit = function () {
      $scope.selected.name = $scope.edited.name;
      $scope.selected.amount = $scope.edited.amount;
      $scope.edited = {};
      $scope.toggleEdit();
    };
    $scope.loadSample = function (workout) {
      console.log(workout);
      $scope.data = JSON.parse(JSON.stringify(workout));
      $scope.sampling = !$scope.sampling;
    };
    $scope.save = function () {
      console.log($scope.data, typeof $scope.data);
      console.log(JSON.stringify($scope.data), typeof JSON.stringify($scope.data));
      $http({
        method: 'POST',
        url: '/api/workouts',
        data: JSON.stringify($scope.data),
        header: {
          'Content-Type': 'application/json'
        },
      })
        .then(function () {
          console.log('success');
          $scope.data = { name: 'New Workout', exercises: [] };
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    }
  })
  .controller('templatesCtrl', function ($scope, $http) {
    $scope.data = { list: [] };
    $scope.selected = null;
    $scope.selecting = function (which) {
      console.log('did');
      $scope.selected = which;

    };
    $scope.retrieve = function () {
      $http({
        method: 'GET',
        url: '/api/workouts'
      })
        .then(function (res) {
          // console.log(res.data[res.data.length-1].exercises, typeof res.data[res.data.length-1].exercises);
          res.data.forEach(function (w) {
            $scope.data.list.push({
              name: w.name,
              exercises: JSON.parse(w.exercises)
            });
          });
          // $scope.data.workouts = res.data;
          console.log($scope.data.list);
          // console.log(typeof $scope.data.list[2].workouts);
          // console.log(JSON.parse($scope.data.list[2].workouts));
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    }

    $scope.retrieve();
  });

