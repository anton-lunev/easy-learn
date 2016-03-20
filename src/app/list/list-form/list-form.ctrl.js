'use strict';

/**
 * List form controller
 * @class
 */
class ListFormController {
    /**
     * @constructor
     * @param {object} googleTranslateService Google translate service
     * @param {object} notificationService Notification service
     */
    constructor(googleTranslateService, notificationService) {
        'ngInject';
        
        this.googleTranslateService = googleTranslateService;
        this.notificationService = notificationService;

        this.word = {
            eng: null,
            translate: null
        };
    }

    /**
     * Makes translation of the word
     * @param {string} word Word for translation
     * @returns {*} promise
     */
    getTranslation(word) {
        if (!word) {
            return;
        }

        return this.googleTranslateService.getTranslation(word).then(translation => {
            this.word.translate = translation;
        });
    }

    /**
     * Add word to collection
     * @param {object} word Word with translation
     */
    addWord(word) {
        const audioDelay = 1000;
        this.addToCollection(word);

        this.notificationService.push('New word', `${word.eng} - ${word.translate}`);
        this.googleTranslateService.playAudio(word.eng, audioDelay);
        this.word = {};
    }
}

export default ListFormController;
