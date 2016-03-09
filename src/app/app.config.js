angular.module('easy-learn')
    .config((localStorageServiceProvider, $urlRouterProvider) => {
        localStorageServiceProvider.setPrefix('el');

        $urlRouterProvider.otherwise('/');
    });
