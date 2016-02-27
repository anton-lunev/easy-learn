angular.module('sidebar')
    .controller('SidebarController', function ($scope, collections, localStorageService, dbService) {
        let ctrl = this;
        
        ctrl.collections = collections;

        ctrl.addCollection = function () {
            dbService.addCollection({
                name: 'New Collection',
                description: 'description',
                list: []
            });
        };

        ctrl.removeCollection = dbService.deleteCollection;
    });
