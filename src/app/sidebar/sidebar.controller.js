angular.module('sidebar')
    .controller('SidebarController', function ($scope, collections, localStorageService) {
        let ctrl = this;
        
        ctrl.collections = collections;

        ctrl.addCollection = function () {
            let name = 'Collection ' + (+Object.keys(collections).length + 1);
            collections[name] = {
                name: name,
                description: 'description',
                list: []
            };
            localStorageService.set('list', collections);
        };

        ctrl.removeCollection = function (id) {
            delete collections[id];
            localStorageService.set('list', collections);
        }
    });
