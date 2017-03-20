(function() {
'use strict';

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'shortList',
      bindToController: true
    };
    return ddo;
};

function FoundItemsDirectiveController() {
    var shortList = this;

    console.log('found, searchTerm:', shortList.found, shortList.searchTerm);
    shortList.emptySearch = function() {
      console.log('foo! foo!', shortList.found);
      return true;
    };
};

NarrowItDownController.$inject = ['MenuSearchService'];
MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function NarrowItDownController( MenuSearchService ) {
  var shortList = this;

  shortList.searchTerm = '';
  shortList.found = [];

  console.log("foo!");
  shortList.narrowIt = function(searchTerm) {
    if( shortList.searchTerm.trim().length === 0 ) {
      shortList.found = [];
      return;
    };

    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
    promise.then(function (response) {
      shortList.found = response;
      console.log(response);
      for (var i in shortList.found) {
        console.log(shortList.found[i].description.toLowerCase());
      }
    });
  };

  // remove an item from the list
  shortList.removeItem = function(index) {
    console.log('removeItem:', index);
    shortList.found.splice( index, 1);
  };

  shortList.getMessage = function() {
    return ("blahblabhahbhbhbhb");
  };
};

function MenuSearchService( $http, ApiBasePath ) {
  var service = this;

  service.getMatchedMenuItems = function( searchTerm ) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (response) {
      var items = response.data.menu_items;
      var matches = []
      for( var i in items ) {
        if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
          matches.push(items[i])
      }
      // return items that contain 'searchTerm' in the description
      return matches;
    });
    return response;
  };
};

})();
