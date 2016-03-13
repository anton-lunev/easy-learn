'use strict';

class SidebarListController {
    constructor(dbService) {
        'ngInject';
        this.removeCollection = dbService.deleteCollection;
    }
}

export default SidebarListController;
