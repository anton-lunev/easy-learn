angular.module('db', [])
    .factory('dbService', function CollectionService($q, Loki) {
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

        function initDB() {
            let indexAdapter = new LokiIndexedAdapter('easy-learn');
            _db = new Loki('list', {
                autosave: true,
                autosaveInterval: 1000, // 1 second
                adapter: indexAdapter
            });
        }

        function getCollections() {
            return $q(function (resolve, reject) {
                let options = {
                    collections: {
                        proto: Object
                    }
                };

                _db.loadDatabase(options, function () {
                    _collections = _db.getCollection('collections');

                    if (!_collections) {
                        _collections = _db.addCollection('collections', {autoupdate: true});
                    }

                    resolve(_collections.data);
                });
            });
        }

        function getCollection(id) {
            return _collections.get(id);
        }

        function addCollection(collection) {
            _collections.insert(collection);
        }

        function updateCollection(collection) {
            _collections.update(collection);
        }

        function deleteCollection(collection) {
            _collections.remove(collection);
        }
    });
