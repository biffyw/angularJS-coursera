(function() {
'use strict';

angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      onRemove: '@'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrow',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController( MenuSearchService ) {
  var narrow = this;
  var found = [];

  var searchTerm = 'fooo';

  // get a list of menu items that match
  narrow.narrowClick = function() {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    // display any results from the request
    promise.then(function (response) {
      console.log("2 Got a response", response)
      narrow.found = response;
    })
    .catch(function (error) {
      console.log("2 Something went terribly wrong.");
      narrow.found = [];
    });
  };

  // remove an item from the list
  narrow.removeItem = function(index) {
    console.log('narrow.removeItem:', index);
    found.splice( index, 1);
  };
};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService( $http, ApiBasePath ) {
  var service = this;

  service.getMatchedMenuItems = function( searchTerm ) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function (response) {
      console.log("Got: ", response.data.menu_items);
      var items = response.data.menu_items;
      var matches = []
      for( var i in items ) {
        if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
          console.log(items[i].description.toLowerCase());
          matches.push(items[i])
      }
      // return items that contain 'searchTerm' in the description

      return matches;
    });

    console.log('getMatchedMenuItems', response);
    return response;
  };
};

})();
