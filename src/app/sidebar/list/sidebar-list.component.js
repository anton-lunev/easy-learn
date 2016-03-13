'use strict';

import SidebarListController from './sidebar-list.ctrl';

let sidebarList = {
    template: require('./sidebar-list.tpl.html'),
    bindings: {
        collections: '<'
    },
    controller: SidebarListController
};

export default sidebarList;
