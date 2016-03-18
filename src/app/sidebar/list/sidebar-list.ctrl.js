'use strict';

/**
 * Sidebar list of collections
 */
class SidebarListController {
    /**
     * @constructor
     * @param {object} dbService Database service
     */
    constructor(dbService) {
        'ngInject';
        this.removeCollection = dbService.deleteCollection;
    }
}

export default SidebarListController;
