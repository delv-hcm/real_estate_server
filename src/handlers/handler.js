class Handler {
    constructor() {
        this._database = undefined;
        this._dbName = undefined;
    }

    get Cursor() {
        return this._database.db(`${this._dbName}`);
    }

    get database() {
        return this._database;
    }
    set database(value) {
        this._database = value;
    }

    get dbName() {
        return this._dbName;
    }

    set dbName(value) {
        this._dbName = value;
    }

    get collection() {
        return this._collection;
    }

    set collection(value) {
        this._collection = value;
    }

    clone() {
        const proto = Object.getPrototypeOf(this);
        const cloned = Object.create(proto);
        cloned._database = this._database;
        cloned._dbName = this._dbName;
        return cloned;
    }

}
module.exports = Handler;