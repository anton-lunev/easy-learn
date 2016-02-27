angular.module('list')
    .factory('listService', function () {
        var timerId = null;
        
        return {
            timer: {
                timerId: timerId
            }
        }
    });
