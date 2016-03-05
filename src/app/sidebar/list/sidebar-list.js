angular.module('sidebar')
    .component('sidebarList', {
        templateUrl: 'app/sidebar/list/sidebar-list.tpl.html',
        bindings: {
            collections: '<'
        },
        controller: function (dbService) {
            let ctrl = this;
            ctrl.removeCollection = dbService.deleteCollection;
        }
    });
