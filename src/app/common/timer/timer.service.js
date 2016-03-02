angular.module('timer', [])
    .factory('timerService', function (googleTranslateService, localStorageService, notificationService) {
        let timer = {
            time: localStorageService.get('time') || 1,
            timerId: undefined
        };

        return {
            toggleTimer,
            updateTime,
            timer
        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

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
        
        function updateTime(time) {
            if (!time) {
                return timer.time = 1;
            }
            localStorageService.set('time', time);
        }
    });

