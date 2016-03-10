class TimerInputController {
    constructor($scope, timerService) {
        this.timerService = timerService;

        $scope.$watch('$ctrl.timerService.timer.time', this.timerService.updateTime);
    }
}

angular.module('list')
    .component('timerInput', {
        templateUrl: 'app/list/timer-input/timer-input.tpl.html',
        bindings: {
            collection: '<'
        },
        controller: TimerInputController
    });
