import angular from 'angular';
import lokijs from 'lokijs/src/loki-angular';
import CollectionService from './db.service';

const deps = [
    lokijs.name
];

export default angular.module('db', deps)
    .service('dbService', CollectionService);
