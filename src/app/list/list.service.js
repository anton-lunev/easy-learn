angular.module('list')
    .factory('listService', function (googleTranslateService) {
        let timerId = null;
        let time = 1;

        let service = {
            toggleTimer,
            timer: {
                time: time,
                timerId: timerId
            }
        };

        return service;
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function toggleTimer(list) {
            if (service.timer.timerId) {
                clearTimeout(service.timer.timerId);
                service.timer.timerId = null;
            } else {
                service.timer.timerId = setTimeout(function tick() {
                    if (list.length) {
                        let word = list[getRandomInt(0, list.length - 1)];
                        new Notification(word.eng, {
                            body: word.translate
                        });

                        googleTranslateService.playAudio(word.eng, 1000);
                    }
                    service.timer.timerId = setTimeout(tick, service.timer.time * 60 * 1000);
                }, 0);
            }
        }
    });

