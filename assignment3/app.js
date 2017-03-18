(function() {
'use strict';

angular.module("NarrowItDownApp" [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject(["MenuSearchService"]);
function NarrowItDownController( MenuSearchService ) {
  var narrow = this;
  var promise = MenuSearchService.getMatchedMenuItems('');

  promise

};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService( $http, ApiBasePath ) = function() {

  service.getMatchedMenuItems = function( searchTerm ) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu-items.json")
    });
    return response;
  };
};

})();
