angular.module('sidebar')
    .component('sidebarHeader', {
        templateUrl: 'app/sidebar/header/sidebar-header.tpl.html',
        controller: function (dbService) {
            let ctrl = this;

            ctrl.addCollection = function () {
                dbService.addCollection({
                    name: 'New Collection',
                    description: 'description',
                    list: []
                });
            };
        }
    });
