angular.module('list')
    .controller('ListController', function ($scope, $animate, localStorageService, collections, collectionId, listService) {
        let ctrl = this;
        let listInStore = collections[collectionId].list;

        ctrl.timer = listService.timer;
        ctrl.list = listInStore || [];
        ctrl.collection = collections[collectionId];
        ctrl.time = localStorageService.get('time') || 1;

        ctrl.toggleTimer = function () {
            if (ctrl.timer.timerId) {
                clearTimeout(ctrl.timer.timerId);
                ctrl.timer.timerId = null;
            } else {
                ctrl.timer.timerId = setTimeout(function tick() {
                    if (ctrl.list.length) {
                        let word = ctrl.list[getRandomInt(0, ctrl.list.length - 1)];
                        new Notification(word.eng, {
                            body: word.translate
                        });
                    }
                    ctrl.timer.timerId = setTimeout(tick, ctrl.time * 60 * 1000);
                }, 0);
            }
        };

        $scope.$watch('list', function () {
            localStorageService.set('list', collections);
        }, true);

        $scope.$watch('time', function () {
            localStorageService.set('time', ctrl.time);
        });

        ctrl.addWord = function (word) {
            ctrl.list.unshift(word);
            new Notification('New word', {
                body: word.eng + ' - ' + word.translate
            });

            ctrl.word = '';
        };
        ctrl.removeWord = function (index) {
            ctrl.list.splice(index, 1);
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });
