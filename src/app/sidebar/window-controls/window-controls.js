'use strict';

import './window-controls.less';
import angular from 'angular';

import windowControls from './window-controls.component';

export default angular.module('sidebar.windowControls', [])
    .component('windowControls', windowControls);
