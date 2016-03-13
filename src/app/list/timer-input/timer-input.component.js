'use strict';

import TimerInputController from './timer-input.ctrl';

let timerInput = {
    template: require('./timer-input.tpl.html'),
    bindings: {
        collection: '<'
    },
    controller: TimerInputController
};

export default timerInput;
