angular.module('googleTranslate', [])
    .factory('googleTranslateService', function ($http, $timeout) {
        return {
            playAudio,
            getTranslation
        };

        function playAudio(word, timeout = 0) {
            let audio = new Audio('https://translate.googleapis.com/translate_tts?client=gtx&tl=en&q=' + decodeURI(word));
            $timeout(() => {
                audio.play();
            }, timeout);
        }

        function getTranslation(query) {
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
    });
