class SidebarHeaderController {
    constructor(dbService) {
        this.dbService = dbService;
    }

    addCollection() {
        this.dbService.addCollection({
            name: 'New Collection',
            description: 'description',
            list: []
        });
    }
}

angular.module('sidebar')
    .component('sidebarHeader', {
        templateUrl: 'app/sidebar/header/sidebar-header.tpl.html',
        controller: SidebarHeaderController
    });
