(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LCController', LCController);

LCController.$inject = ['$scope'];
function LCController($scope) {
  $scope.lunchList = '';
  $scope.message = '';
  $scope.msgColour = 'black';

  $scope.listCheck = function () {
    var list = $scope.lunchList.split(',');
    var i, str, n = 0;
    for (i in list) {
      str = list[ i ].trim();
      if (str.length > 0) {
        n += 1;
      }
    }
    console.log( 'items =', n)
    if (n == 0) {
      $scope.message = 'Please enter data first';
    }
    else if (n > 3) {
      $scope.message = 'Too Much!';
      $scope.msgColour = 'red';
    }
    else {
      $scope.message = 'Enjoy!';
      $scope.msgColour = 'green';
    }

    $scope.clearMessage = function() {
      $scope.message = '';
      $scope.msgColour = 'black';
    }
  }
}

})();
