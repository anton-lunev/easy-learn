'use strict';

import angular from 'angular';

/**
 * List of words controller
 * @class
 */
class ListController {
    /**
     * @constructor
     * @param {object} $scope Scope object
     * @param {object} collection Current collection
     * @param {object} dbService Database service
     */
    constructor($scope, collection, dbService) {
        'ngInject';

        this.collection = collection;

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(this.collection);
            }
        }, true);
    }

    /**
     * Add word to collection
     * @param {object} word New word
     */
    addToCollection = (word) => {
        this.collection.list.unshift(word);
    };

    /**
     * Remove word from collection
     * @param {int} index Word index
     */
    removeFromCollection(index) {
        this.collection.list.splice(index, 1);
    }
}

export default ListController;
