angular.module('list')
    .config(function ($stateProvider) {
        $stateProvider.state('route.list.item', {
            url: 'list/{id}',
            views: {
                "details@route": {
                    templateUrl: 'app/list/list.tpl.html',
                    controller: 'ListController',
                    controllerAs: 'list'
                }
            },
            resolve: {
                collectionId: function ($stateParams) {
                    return $stateParams.id
                }
            }
        })
    });
