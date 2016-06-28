import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';

/**
 * Collection service
 */
class CollectionService {
    _collections = {};
    _db;

    /**
     * @constructor
     * @param {function} $q deferred
     * @param {function} Loki constructor
     */
    constructor($q, Loki) {
        'ngInject';

        this._$q = $q;
        this._db = new Loki('list', {
            autosave: true,
            autosaveInterval: 1000,
            adapter: new LokiIndexedAdapter('easy-learn')
        });
    }

    /**
     * Returned all collections
     * @returns {*} promise
     */
    getCollections() {
        return this._$q(resolve => {
            const options = {
                collections: {
                    proto: Object
                }
            };

            this._db.loadDatabase(options, () => {
                this._collections = this._db.getCollection('collections');

                if (!this._collections) {
                    this._collections = this._db.addCollection('collections', {autoupdate: true});
                }

                resolve(this._collections.data);
            });
        });
    }

    /**
     * Returned collection by id
     * @param {int} id Collection id
     * @returns {object} Collection object
     */
    getCollection(id) {
        return this._collections.get(id);
    }

    /**
     * Add new collection
     * @param {object} collection New collection
     */
    addCollection(collection) {
        this._collections.insert(collection);
    }

    /**
     * Update collection data
     * @param {object} collection Collection object
     */
    updateCollection(collection) {
        this._collections.update(collection);
    }

    /**
     * Delete collection
     * @param {object} collection Collection object
     */
    deleteCollection(collection) {
        this._collections.remove(collection);
    }
}

export default CollectionService;
