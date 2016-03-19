'use strict';

import './timer-input.css'
import angular from 'angular';
import timer from 'common/timer/timer.service';
import timerInput from './timer-input.component';

const deps = [
    timer.name
];

export default angular.module('list.timer-input', deps)
    .component('timerInput', timerInput);
