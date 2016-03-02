angular.module('googleTranslate', [])
    .constant('googleTranslateConfig', {
        domain: 'https://translate.googleapis.com',
        source: 'en',
        target: 'ru'
    })

    .factory('googleTranslateService', function ($http, $timeout, googleTranslateConfig) {
        return {
            playAudio,
            getTranslation
        };

        function playAudio(word, timeout = 0) {
            let audio = new Audio(`${googleTranslateConfig.domain}/translate_tts?client=gtx&tl=en&q=${decodeURI(word)}`);
            $timeout(() => {
                audio.play();
            }, timeout);
        }

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
