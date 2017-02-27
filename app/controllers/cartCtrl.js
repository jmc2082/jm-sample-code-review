'use strict';

angular.module('cartCtrl', [])
    .controller('cartController', function(
        HttpService,
        FieldValidationFactory,
        GeneralFeatures
    ) {
          var vm = this;

          vm.vars = {
              successMessage: false,
              errorMessage: false
          };

          vm.getCartData = function() {
              var getInfo = {
                  getJson: true,
                  uri: '/app/dist/service-data/cart-data.json'
              };
              HttpService.getRequest(getInfo)
                  .then(function(data) {
                      if (data.data) {
                          vm.cartArray = data.data[0].products;
                          console.log('Cart data in: ');
                          console.log(vm.cartArray);
                      } else {
                          vm.vars.errorMessage = 'Sorry no cart items were found';
                          console.log('Sorry no cart items were found');
                          console.log(vm.vars.errorMessage);
                      }
                  });
          };

          console.log('cart controller');

}).filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                        value = value.substr(0, lastspace);
                }
        }

        return value + (tail || ' …');
    };
});
