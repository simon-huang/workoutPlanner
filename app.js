angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/fizzbuzz', {
        templateUrl: 'fizzbuzz.html',
        controller: 'fizzbuzzCtrl'
      })
      .when('/fozzbazz', {
        templateUrl: 'fozzbazz.html',
        controller: 'fozzbazzCtrl'
      })
      .otherwise({
        redirectTo: '/fizzbuzz'
      });
  })
// DO NOT MODIFY CODE ABOVE THIS LINE

/*  HINT: Make sure your controllers, methods, and variables 
    are named what $routeProvider and the partials are expecting  */

  .factory('counter', function() {
    var count = 0;

    var increment = function() {
      count++;
    };

    var currentCount = function() {
      return count;
    };

    var fizzDisplay = function() {
      if (count === 0) {
        return count;
      } else if (count % 3 === 0 && count % 5 === 0) {
        return 'FIZZBUZZ';
      } else if (count % 3 === 0) {
        return 'FIZZ';
      } else if (count % 5 === 0) {
        return 'BUZZ';
      } 
      return count;
    };

    var fozzDisplay = function() {
      if (count === 0) {
        return count;
      } else if (count % 4 === 0 && count % 6 === 0) {
        return 'FOZZBAZZ';
      } else if (count % 4 === 0) {
        return 'FOZZ';
      } else if (count % 6 === 0) {
        return 'BAZZ';
      } 
      return count;
    };

    return {
      increment: increment,
      currentCount: currentCount,
      fizzDisplay: fizzDisplay,
      fozzDisplay: fozzDisplay
    };
  })
  .controller('fizzbuzzCtrl', function($scope, counter) {
    $scope.display = counter.fizzDisplay();
    $scope.increment = function() {
      counter.increment();
      $scope.display = counter.fizzDisplay();
    };
  })
  .controller('fozzbazzCtrl', function($scope, counter) {
    $scope.display = counter.fozzDisplay();
    $scope.increment = function() {
      counter.increment();
      $scope.display = counter.fozzDisplay();
    };
  });
