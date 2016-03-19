'use strict';

import './list-form.css';
import angular from 'angular';
import listForm from './list-form.component';
import googleTranslate from 'common/google-translate/google-translate.service';
import notification from 'common/notification/notification.service';

const deps = [
    googleTranslate.name,
    notification.name
];

export default angular.module('list.list-form', deps)
    .component('listForm', listForm);
