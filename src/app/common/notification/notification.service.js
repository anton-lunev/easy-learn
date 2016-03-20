'use strict';
import angular from 'angular';

export default angular.module('notification', [])
    .factory('notificationService', function notificationService() {
        return {
            /**
             * Show push notification
             * @param {string} title Notification title
             * @param {string} body Notification body
             * @returns {object} Notification object
             */
            push(title, body) {
                return new Notification(title, {body: body});
            }
        };
    });

