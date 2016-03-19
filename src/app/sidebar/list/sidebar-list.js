'use strict';

import 'svg/close.svg';
import './sidebar-list.css';

import angular from 'angular';
import sidebarList from './sidebar-list.component';

const deps = [];

export default angular.module('sidebar.list', deps)
    .component('sidebarList', sidebarList);
