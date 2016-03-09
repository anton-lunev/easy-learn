class SidebarController {
    constructor(collections) {
        this.collections = collections;
    }
}

angular.module('sidebar').controller('SidebarController', SidebarController);
