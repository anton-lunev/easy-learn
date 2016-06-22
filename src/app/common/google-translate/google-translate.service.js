'use strict';
import angular from 'angular';

export default angular.module('googleTranslate', [])
    .constant('googleTranslateConfig', {
        domain: 'https://crossorigin.me/https://translate.googleapis.com',
        source: 'en',
        target: 'ru'
    })

    .factory('googleTranslateService', function googleTranslateService($http, $timeout, googleTranslateConfig) {
        'ngInject';

        return {
            /**
             * Play audio with word
             * @param {string} word Word for playing
             * @param {int} timeout Delay time
             */
            playAudio(word, timeout = 0) {
                const audioUrl = `${googleTranslateConfig.domain}/translate_tts?client=gtx&tl=en&q=${decodeURI(word)}`;
                const audio = new Audio(audioUrl);
                // audio.autoplay = true;
                $timeout(() => {
                    audio.play();
                }, timeout);
            },

            /**
             * Returned translation by query
             * @param {string} query Word for translation
             * @returns {*|Promise.<TResult>} Promise
             */
            getTranslation(query) {
                const promise = $http({
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
                    transformResponse(res) {
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
        };
    });
