angular.module('list')
    .factory('listService', function ($http) {
        let timerId = null;
        let time = 1;

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
                    }
                    service.timer.timerId = setTimeout(tick, service.timer.time * 60 * 1000);
                }, 0);
            }
        }

        function getTranslation(query) {
            //TODO move it to the new service
            let sourceLang = "en";
            let targetLang = "ru";

            let promise = $http({
                method: 'GET',
                url: "https://translate.googleapis.com/translate_a/single",
                crossDomain: true,
                params: {
                    client: 'gtx',
                    sl: sourceLang,
                    tl: targetLang,
                    dt: 't',
                    q: query
                },
                transformResponse: function (res) {
                    try {
                        return JSON.parse(res.replace(/,(?=,)/g, ',null'));
                    } catch (e) {
                        return eval(res);
                    }
                }
            });

            return promise.then((res) => {
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

        let service = {
            toggleTimer,
            getTranslation,

            timer: {
                time: time,
                timerId: timerId
            }
        };

        return service;
    });

