class ListController {
    constructor($scope, collection, dbService) {
        this.collection = collection;

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(this.collection);
            }
        }, true);

        //TODO investigate how to keep context in class method
        this.addToCollection = (word) => {
            this.collection.list.unshift(word);
        }
    }

    removeFromCollection(index) {
        this.collection.list.splice(index, 1);
    }
}

angular.module('list').controller('ListController', ListController);
