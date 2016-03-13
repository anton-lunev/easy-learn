'use strict';
import angular from 'angular';

export default angular.module('googleTranslate', [])
    .constant('googleTranslateConfig', {
        domain: 'https://translate.googleapis.com',
        source: 'en',
        target: 'ru'
    })

    .factory('googleTranslateService', function ($http, $timeout, googleTranslateConfig) {
        'ngInject';
        
        return {
            playAudio,
            getTranslation
        };

        /**
         * Play audio with word
         * @param {string} word
         * @param {int} timeout
         */
        function playAudio(word, timeout = 0) {
            let audio = new Audio(`${googleTranslateConfig.domain}/translate_tts?client=gtx&tl=en&q=${decodeURI(word)}`);
            $timeout(() => {
                audio.play();
            }, timeout);
        }

        /**
         * Returned translation by query
         * @param {string} query
         * @returns {*|Promise.<TResult>}
         */
        function getTranslation(query) {
            let promise = $http({
                method: 'GET',
                url: `${googleTranslateConfig.domain}/translate_a/single`,
                crossDomain: true,
                params: {
                    client: 'gtx',
                    sl: googleTranslateConfig.source,
                    tl: googleTranslateConfig.target,
                    dt: 't',
                    q: query
                },
                transformResponse: res => {
                    try {
                        return JSON.parse(res.replace(/,(?=,)/g, ',null'));
                    } catch (e) {
                        return eval(res);
                    }
                }
            });

            return promise.then(res => {
                console.log(res);
                let result = null;
                try {
                    result = res.data[0][0][0];
                } catch (e) {
                    console.log('Can`t translate word');
                }
                return result;
            });
        }
    });
