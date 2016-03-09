class SidebarListController {
    constructor(dbService) {
        this.removeCollection = dbService.deleteCollection;
    }
}

angular.module('sidebar')
    .component('sidebarList', {
        templateUrl: 'app/sidebar/list/sidebar-list.tpl.html',
        bindings: {
            collections: '<'
        },
        controller: SidebarListController
    });
