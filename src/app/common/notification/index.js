'use strict';
import angular from 'angular';
import NotificationService from './notification.service';

export default angular.module('notification', [])
    .service('notificationService', NotificationService);

