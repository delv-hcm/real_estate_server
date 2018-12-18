 class Product {
    constructor(Cursor, collection) {
        this._cursor = Cursor;
        this._collection = collection;
    }
    getAllProduct(){
        return async(req, res, next) => {
            console.log('Request: get all product');
            await this._cursor.collection(`${this._collection}`).find({})
            .toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }
    getProductDetail() {
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