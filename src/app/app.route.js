angular.module('easy-learn')
    .config($stateProvider => {
        $stateProvider
            .state('route', {
                url: '',
                abstract: true,
                views: {
                    'sidebar': {
                        templateUrl: 'app/sidebar/sidebar.tpl.html',
                        controller: 'SidebarController',
                        controllerAs: 'sidebar'
                    },
                    'content': {
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
                    'details': {
                        templateUrl: 'app/welcome/welcome.tpl.html'
                    }
                }
            })
    });
