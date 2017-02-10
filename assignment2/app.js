(function() {
  'use strict';

  angular.module('ShoppingListCheckoff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckoffService', ShoppingListCheckoffService);

  ToBuyController.$inject = ['ShoppingListCheckoffService'];
  function ToBuyController( ShoppingListCheckoffService ) {
    var need = this;

    need.items = ShoppingListCheckoffService.getItemsToBuy();

    need.boughtItem = function(index) {
      ShoppingListCheckoffService.checkOffItem(index);
    };
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
  function AlreadyBoughtController( ShoppingListCheckoffService ) {
    var have = this;

    have.items = ShoppingListCheckoffService.getItemsAlreadyBought();
  };

  function ShoppingListCheckoffService() {
      var service = this;

      var itemsToBuy = [ { quantity: 10, name: 'foo'},
                         { quantity: 29, name: 'bar'},
                         { quantity: 8, name: 'baz'},
                         { quantity: 99, name: 'fizz'},
                         { quantity: 11, name: 'blart'} ];
      var itemsAlreadyBought = [];

      service.getItemsToBuy = function() {
        return itemsToBuy;
      };

      service.getItemsAlreadyBought = function() {
        return itemsAlreadyBought;
      };

      service.checkOffItem = function( index ) {
        var item = itemsToBuy[ index ];
        itemsAlreadyBought.push(item);
        itemsToBuy.splice(index, 1);
      }
  };

})();
