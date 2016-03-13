'use strict';

export default $stateProvider => {
    'ngInject';
    
    $stateProvider
        .state('route', {
            url: '',
            abstract: true,
            views: {
                'sidebar': {
                    template: require('./sidebar/sidebar.tpl.html'),
                    controller: 'SidebarController',
                    controllerAs: 'sidebar'
                },
                'content': {
                    template: require('./app.tpl.html')
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
                    template: require('./welcome/welcome.tpl.html')
                }
            }
        })
};
