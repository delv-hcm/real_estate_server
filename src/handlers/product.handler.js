 class Product {

    constructor(Cursor, collection) {
        this._cursor = Cursor;
        this._collection = collection;
    }

    getAll(){
        return async(req, res, next) => {
            console.log('Request: get all product');
            await this._cursor.collection(`${this._collection}`).find({}).limit(12)
            .toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }

    getDetail(){
        return async(req, res, next) => {
            const query = {_id: parseInt(req.params.productId)};
            console.log('Get Product detail by id', query);
            await this._cursor.collection(`${this._collection}`).find(query)
            .toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }

    
}
module.exports = Product;