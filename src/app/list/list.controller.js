angular.module('list')
    .controller('ListController', function ($scope, $animate, $timeout, collection, timerService, dbService) {
        let ctrl = this;
        ctrl.collection = collection;

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(ctrl.collection);
            }
        }, true);

        ctrl.removeFromCollection = function (index) {
            ctrl.collection.list.splice(index, 1);
        };

        ctrl.addToCollection = function (word) {
            ctrl.collection.list.unshift(word);
        }
    });
