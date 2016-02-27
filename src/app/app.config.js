angular.module('easy-learn')
    .config(function (localStorageServiceProvider, $urlRouterProvider) {
        localStorageServiceProvider.setPrefix('lw');

        $urlRouterProvider.otherwise('/');
    });
