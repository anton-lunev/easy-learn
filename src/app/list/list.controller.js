angular.module('list')
    .controller('ListController', function ($scope, $animate, $timeout, collection, timerService,
                                            dbService, googleTranslateService, notificationService) {
        let ctrl = this;

        ctrl.collection = collection;
        
        ctrl.word = {
            eng: null,
            translate: null
        };

        $scope.$watch('list.collection.list', (val, oldVal) => {
            if (!angular.equals(val, oldVal)) {
                dbService.updateCollection(ctrl.collection);
            }
        }, true);

        ctrl.getTranslation = function (word) {
            if (!word) {
                return;
            }

            googleTranslateService.getTranslation(word).then(translation => {
                ctrl.word.translate = translation;
            });
        };

        ctrl.addWord = function (word) {
            ctrl.collection.list.unshift(word);

            notificationService.push('New word', `${word.eng} - ${word.translate}`);
            googleTranslateService.playAudio(word.eng, 1000);
            ctrl.word = {};
        };

        ctrl.removeWord = function (index) {
            ctrl.collection.list.splice(index, 1);
        };
    });
