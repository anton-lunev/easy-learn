import angular from 'angular';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import lokijs from 'lokijs/src/loki-angular';

const deps = [
    lokijs.name
];

export default angular.module('db', deps)
    .factory('dbService', function CollectionService($q, Loki) {
        'ngInject';
        
        let _db;
        let _collections;
        initDB();

        return {
            getCollections,
            getCollection,
            addCollection,
            updateCollection,
            deleteCollection
        };

        /**
         * Init database
         */
        function initDB() {
            _db = new Loki('list', {
                autosave: true,
                autosaveInterval: 1000,
                adapter: new LokiIndexedAdapter('easy-learn')
            });
        }

        /**
         * Returned all collections
         * @returns {*}
         */
        function getCollections() {
            return $q((resolve, reject) => {
                let options = {
                    collections: {
                        proto: Object
                    }
                };

                _db.loadDatabase(options, () => {
                    _collections = _db.getCollection('collections');

                    if (!_collections) {
                        _collections = _db.addCollection('collections', {autoupdate: true});
                    }

                    resolve(_collections.data);
                });
            });
        }

        /**
         * Returned collection by id
         * @param {int} id
         * @returns {*}
         */
        function getCollection(id) {
            return _collections.get(id);
        }

        /**
         * Add new collection
         * @param {object} collection
         */
        function addCollection(collection) {
            _collections.insert(collection);
        }

        /**
         * Update collection data
         * @param {object} collection
         */
        function updateCollection(collection) {
            _collections.update(collection);
        }

        /**
         * Delete collection
         * @param {object} collection
         */
        function deleteCollection(collection) {
            _collections.remove(collection);
        }
    });
