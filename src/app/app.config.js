'use strict';

export default (localStorageServiceProvider, $urlRouterProvider) => {
    'ngInject';
    
    localStorageServiceProvider.setPrefix('el');
    $urlRouterProvider.otherwise('/');
}
