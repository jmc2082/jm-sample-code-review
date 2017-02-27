'use strict';

angular.module('mainCtrl', [])
    .controller('mainController', function(
        HttpService,
        FieldValidationFactory,
        GeneralFeatures,
        $timeout
    ) {
          var vm = this;

          vm.vars = {
              mapLoader: true,
              successMessage: false,
              errorMessage: false
          };

          vm.getMapLocationsData = function() {
              var getInfo = {
                  getJson: true,
                  uri: '/app/dist/service-data/map-locations-data.json'
              };
              HttpService.getRequest(getInfo)
                  .then(function(data) {
                      if (data.data) {
                          var closeLoaderThenInitMaps = function() {
                              vm.vars.mapLoader = false;
                              vm.locationSliderArray = data.data;
                              vm.sliderLoaded = true;
                              vm.slickConfig = {
                                  infinite: true,
                                  // dots: true,
                                  arrows: false,
                                  autoplay: false,
                                  // autoplaySpeed: 5000,
                                  slidesToShow: 3,
                                  slidesToScroll: 3,
                                  responsive: [
                                    {
                                      breakpoint: 768,
                                      settings: {
                                        slidesToShow: 3,
                                        slidesToScroll: 3,
                                        infinite: true,
                                        dots: false
                                      }
                                    },
                                    {
                                      breakpoint: 700,
                                      settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 2,
                                        dots: true
                                      }
                                    },
                                    {
                                      breakpoint: 480,
                                      settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        dots: true
                                      }
                                    }
                                    // You can unslick at a given breakpoint now by adding:
                                    // settings: "unslick"
                                    // instead of a settings object
                                  ]
                              };
                          };
                          // Simulate a short delay from the server
                          $timeout(closeLoaderThenInitMaps, 2000);
                      } else {
                          var throwError = function() {
                              vm.vars.errorMessage = 'Sorry no locations were found';
                          };
                          // Simulate a short delay from the server
                          $timeout(throwError, 4000);
                      }
                  });
          };

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
