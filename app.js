(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LCController', LCController);

LCController.$inject = ['$scope'];
function LCController($scope) {
  $scope.lunchList = '';
  $scope.message = 'hi mom';
  $scope.listCheck = function () {
    var n = $scope.lunchList.split(',');
    console.log(n, n.length);
  }
}

})();
