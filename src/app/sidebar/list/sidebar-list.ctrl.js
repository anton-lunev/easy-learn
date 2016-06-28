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

        this._dbService = dbService;
    }

    /**
     * Remove collection
     * @param {object} collection Removed collection
     */
    removeCollection(collection) {
        this._dbService.deleteCollection(collection)
    }
}

export default SidebarListController;
