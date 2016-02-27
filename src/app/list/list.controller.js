angular.module('list')
    .controller('ListController', function ($scope, $animate, localStorageService, collections, collection, listService,
                                            dbService) {
        let ctrl = this;

        ctrl.collection = collection;

        ctrl.timer = listService.timer;
        ctrl.timer.time = localStorageService.get('time') || 1;

        ctrl.toggleTimer = listService.toggleTimer;

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(ctrl.collection);
            }
        }, true);

        $scope.$watch('list.timer.time', () => {
            localStorageService.set('time', ctrl.timer.time);
        });

        ctrl.addWord = function (word) {
            ctrl.collection.list.unshift(word);
            new Notification('New word', {
                body: word.eng + ' - ' + word.translate
            });

            ctrl.word = '';
        };
        ctrl.removeWord = function (index) {
            ctrl.collection.list.splice(index, 1);
        };
    });
