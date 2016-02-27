angular.module('easy-learn')
    .config(function ($stateProvider) {
        $stateProvider
            .state('route', {
                url: '',
                abstract: true,
                views: {
                    "sidebar": {
                        templateUrl: 'app/sidebar/sidebar.tpl.html',
                        controller: 'SidebarController',
                        controllerAs: 'sidebar'
                    },
                    "header": {
                        templateUrl: 'app/header/header.tpl.html',
                        controller: 'HeaderController'
                    },
                    "content": {
                        templateUrl: 'app/app.tpl.html'
                    }
                },
                resolve: {
                    collections(dbService) {
                        return dbService.getCollections();
                    }
                }
            })

            .state('route.list', {
                url: '/',
                views: {
                    "details": {
                        templateUrl: 'app/welcome/welcome.tpl.html'
                    }
                }
            })
    });
