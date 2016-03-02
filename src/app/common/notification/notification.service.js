angular.module('notification', [])
    .factory('notificationService', function () {
        return {
            push
        };

        function push(title, body) {
            new Notification(title, {body: body});
        }
    });

