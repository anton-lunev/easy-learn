'use strict';

class TimerInputController {
    constructor($scope, timerService) {
        'ngInject';
        this.timerService = timerService;

        $scope.$watch('$ctrl.timerService.timer.time', this.timerService.updateTime);
    }
}

export default TimerInputController;
