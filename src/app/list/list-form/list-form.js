angular.module('sidebar')
    .component('listForm', {
        templateUrl: 'app/list/list-form/list-form.tpl.html',
        bindings: {
            addToCollection: '<'
        },
        controller: function (googleTranslateService, notificationService) {
            let ctrl = this;

            ctrl.word = {
                eng: null,
                translate: null
            };

            ctrl.getTranslation = function (word) {
                if (!word) {
                    return;
                }

                googleTranslateService.getTranslation(word).then(translation => {
                    ctrl.word.translate = translation;
                });
            };

            ctrl.addWord = function (word) {
                ctrl.addToCollection(word);

                notificationService.push('New word', `${word.eng} - ${word.translate}`);
                googleTranslateService.playAudio(word.eng, 1000);
                ctrl.word = {};
            };
        }
    });
