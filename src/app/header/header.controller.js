angular.module('header')
    .controller('HeaderController', function ($scope) {
        let ipc = require("electron").ipcRenderer;
        
        $scope.close = function () {
            ipc.send('close-main-window');
        };
        $scope.minimize = function () {
            ipc.send('minimize-main-window');
        };
        $scope.fullScreen = function () {
            ipc.send('maximize-main-window');
        };
    });
