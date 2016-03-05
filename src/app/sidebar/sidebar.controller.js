angular.module('sidebar')
    .controller('SidebarController', function ($scope, collections, localStorageService, dbService) {
        let ctrl = this;
        
        ctrl.collections = collections;
    });
