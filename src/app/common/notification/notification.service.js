'use strict';

/**
 * Notification service
 */
class NotificationService {
    /**
     * Show push notification
     * @param {string} title Notification title
     * @param {string} body Notification body
     * @returns {object} Notification object
     */
    push(title, body) {
        return new Notification(title, {body: body});
    }
}

export default NotificationService;
