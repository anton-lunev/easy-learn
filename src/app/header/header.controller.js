angular.module('header')
    .controller('HeaderController', function ($scope) {
        let ctrl = this;
        let ipc = require("electron").ipcRenderer;

        ctrl.close = function () {
            ipc.send('close-main-window');
        };
        ctrl.minimize = function () {
            ipc.send('minimize-main-window');
        };
        ctrl.fullScreen = function () {
            ipc.send('maximize-main-window');
        };
    });
