'use strict';

angular.module('navbarCtrl', [])
    .controller('navbarController', function (
        GeneralFeatures
    ) {

        var vm = this;

        vm.vars = {

        };

        // Main menu
        vm.mainMenu = [
            {
                'title': 'security & safety',
                'link': 'security & safety'
            },
            {
                'title': 'energy & efficiency',
                'link': 'energy & efficiency'
            },
            {
                'title': 'comfort & convenience',
                'link': 'comfort & convenience'
            }
        ];

  });
