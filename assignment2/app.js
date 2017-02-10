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

      var itemsToBuy = ['10 foo', '29 bar', '8 baz', '99 fizz', '11 blart'];
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
