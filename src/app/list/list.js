'use strict';

import './list.css';
import angular from 'angular';
import ListController from './list.ctrl';
import listService from './list.service';
import route from './list.route';

import listForm from './list-form/list-form';
import timerInput from './timer-input/timer-input';

const deps = [
    listForm.name,
    timerInput.name
];

export default angular.module('list', deps)
    .controller('ListController', ListController)
    .factory('listService', listService)
    .config(route);
