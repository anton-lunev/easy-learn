'use strict';

/**
 * Sidebar header panel
 */
class SidebarHeaderController {
    /**
     * @constructor
     * @param {object} dbService Database service
     */
    constructor(dbService) {
        'ngInject';
        this.dbService = dbService;
    }

    /**
     * Add new collection to db
     */
    addCollection() {
        this.dbService.addCollection({
            name: 'New Collection',
            description: 'description',
            list: []
        });
    }
}

export default SidebarHeaderController;
