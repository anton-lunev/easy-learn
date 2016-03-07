angular.module('sidebar')
    .component('timerInput', {
        templateUrl: 'app/list/timer-input/timer-input.tpl.html',
        bindings: {
            collection: '<'
        },
        controller: function ($scope, timerService) {
            let ctrl = this;
            ctrl.timer = timerService.timer;
            ctrl.toggleTimer = timerService.toggleTimer;

            $scope.$watch('$ctrl.timer.time', timerService.updateTime);
        }
    });
