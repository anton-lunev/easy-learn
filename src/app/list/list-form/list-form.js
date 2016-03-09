class ListFormController {
    constructor(googleTranslateService, notificationService) {
        this.googleTranslateService = googleTranslateService;
        this.notificationService = notificationService;

        this.word = {
            eng: null,
            translate: null
        };
    }

    getTranslation(word) {
        if (!word) {
            return;
        }

        this.googleTranslateService.getTranslation(word).then(translation => {
            this.word.translate = translation;
        });
    }

    addWord(word) {
        this.addToCollection(word);

        this.notificationService.push('New word', `${word.eng} - ${word.translate}`);
        this.googleTranslateService.playAudio(word.eng, 1000);
        this.word = {};
    }
}

angular.module('list')
    .component('listForm', {
        templateUrl: 'app/list/list-form/list-form.tpl.html',
        bindings: {
            addToCollection: '<'
        },
        controller: ListFormController
    });
