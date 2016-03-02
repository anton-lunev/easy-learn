angular.module('easy-learn')
    .config(function (localStorageServiceProvider, $urlRouterProvider) {
        localStorageServiceProvider.setPrefix('el');

        $urlRouterProvider.otherwise('/');
    });
