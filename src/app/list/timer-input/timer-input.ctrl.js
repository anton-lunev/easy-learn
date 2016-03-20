'use strict';

/**
 * Timer input controller
 */
class TimerInputController {
    /**
     * @constructor
     * @param {object} $scope Scope object
     * @param {object} timerService Timer service
     */
    constructor($scope, timerService) {
        'ngInject';
        this.timerService = timerService;

        $scope.$watch('$ctrl.timerService.timer.time', this.timerService.updateTime);
    }
}

export default TimerInputController;
