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
        let _collections = {};
        initDB();

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

        return {
            /**
             * Returned all collections
             * @returns {*} promise
             */
            getCollections() {
                return $q(resolve => {
                    const options = {
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
            },

            /**
             * Returned collection by id
             * @param {int} id Collection id
             * @returns {object} Collection object
             */
            getCollection(id) {
                return _collections.get(id);
            },

            /**
             * Add new collection
             * @param {object} collection New collection
             */
            addCollection(collection) {
                _collections.insert(collection);
            },

            /**
             * Update collection data
             * @param {object} collection Collection object
             */
            updateCollection(collection) {
                _collections.update(collection);
            },

            /**
             * Delete collection
             * @param {object} collection Collection object
             */
            deleteCollection(collection) {
                _collections.remove(collection);
            }
        };
    });
