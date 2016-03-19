'use strict';

import './window-controls.css';
import angular from 'angular';

import windowControls from './window-controls.component';

export default angular.module('sidebar.windowControls', [])
    .component('windowControls', windowControls);
