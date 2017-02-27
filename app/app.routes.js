angular.module('app.routes', ['ngRoute'])
    .config(function(
        $stateProvider,
        $urlRouterProvider,
        $locationProvider) {

        var siteNav = {
            controller: 'navbarController',
            controllerAs: 'nav',
            templateUrl: 'app/views/navs/main-navbar-view.html'
        };
        var siteFooter = {
            templateUrl: 'app/views/navs/footer-navbar-view.html'
        };

        $stateProvider

            .state('home', {
                url: '/',
                data: {
                    pageTitle: 'Home | Joshua Mackey Prototype'
                },
                views: {
                    'sitenav@': siteNav,
                    'webcontent@': {
                        templateUrl: 'app/views/main-view.html',
                        controller: 'mainController',
                        controllerAs: 'main'
                    },
                    'sitefooter@': siteFooter
                }
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })
    .directive('updateTitle', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            return {
                link: function(scope, element) {

                    var listener = function(event, toState) {

                        var title = 'Home | Joshua Mackey Prototype';
                        if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                        $timeout(function() {
                            element.text(title);
                        }, 0, false);
                    };

                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ]);
