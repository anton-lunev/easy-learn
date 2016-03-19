'use strict';

import './sidebar.css';
import angular from 'angular';
import SidebarController from './sidebar.ctrl';
import windowControls from './window-controls/window-controls';
import header from './header/sidebar-header';
import list from './list/sidebar-list';

const deps = [
    windowControls.name,
    header.name,
    list.name
];

export default angular.module('sidebar', deps)
    .controller('SidebarController', SidebarController);
