'use strict';
import angular from 'angular';

export default angular.module('notification', [])
    .factory('notificationService', function () {
        return {
            push
        };

        /**
         * Show push notification
         * @param {string} title
         * @param {string} body
         */
        function push(title, body) {
            return new Notification(title, {body: body});
        }
    });

