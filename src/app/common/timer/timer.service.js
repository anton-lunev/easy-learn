'use strict';
import angular from 'angular';

export default angular.module('timer', [])
    .factory('timerService', function timerService(googleTranslateService, localStorageService, notificationService) {
        'ngInject';

        const timer = {
            time: localStorageService.get('time') || 1,
            timerId: undefined
        };

        return {
            timer,

            /**
             * Returned random value
             * @param {int} min Min value
             * @param {int} max Max value
             * @returns {int} Random value
             */
            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            /**
             * Started/stopped timer
             * @param {object} list Collection
             */
            toggleTimer(list) {
                const self = this;
                const ms = 1000;
                const sec = 60;

                if (timer.timerId) {
                    clearTimeout(timer.timerId);
                    timer.timerId = null;
                } else {
                    timer.timerId = setTimeout(function tick() {
                        if (list.length) {
                            const word = list[self.getRandomInt(0, list.length - 1)];

                            notificationService.push(word.eng, word.translate);
                            googleTranslateService.playAudio(word.eng, ms);
                        }
                        timer.timerId = setTimeout(tick, timer.time * sec * ms);
                    }, 0);
                }
            },

            /**
             * Updated time in local storage
             * @param {int} time Minutes
             * @returns {int} Time
             */
            updateTime(time) {
                if (!time) {
                    timer.time = 1;
                    return timer.time;
                }
                localStorageService.set('time', time);
            }
        };
    });

