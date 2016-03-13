'use strict';

export default $stateProvider => {
    'ngInject';
    
    $stateProvider.state('route.list.item', {
        url: 'list/{id}',
        views: {
            'details@route': {
                template: require('./list.tpl.html'),
                controller: 'ListController',
                controllerAs: 'list'
            }
        },
        resolve: {
            collection($stateParams, dbService, collections) {
                return dbService.getCollection($stateParams.id);
            }
        }
    })
}
