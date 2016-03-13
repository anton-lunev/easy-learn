'use strict';
import angular from 'angular';

export default angular.module('timer', [])
    .factory('timerService', function (googleTranslateService, localStorageService, notificationService) {
        'ngInject';
        
        let timer = {
            time: localStorageService.get('time') || 1,
            timerId: undefined
        };

        return {
            toggleTimer,
            updateTime,
            timer
        };

        /**
         * Returned random value
         * @param {int} min
         * @param {int} max
         * @returns {*}
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        /**
         * Started/stopped timer
         * @param {object} list
         */
        function toggleTimer(list) {
            if (timer.timerId) {
                clearTimeout(timer.timerId);
                timer.timerId = null;
            } else {
                timer.timerId = setTimeout(function tick() {
                    if (list.length) {
                        let word = list[getRandomInt(0, list.length - 1)];

                        notificationService.push(word.eng, word.translate);
                        googleTranslateService.playAudio(word.eng, 1000);
                    }
                    timer.timerId = setTimeout(tick, timer.time * 60 * 1000);
                }, 0);
            }
        }

        /**
         * Updated time in local storage
         * @param {int} time
         * @returns {number}
         */
        function updateTime(time) {
            if (!time) {
                return timer.time = 1;
            }
            localStorageService.set('time', time);
        }
    });

