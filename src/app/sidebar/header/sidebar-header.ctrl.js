'use strict';

class SidebarHeaderController {
    constructor(dbService) {
        'ngInject';
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

export default SidebarHeaderController;
