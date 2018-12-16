var exress = require('express');
 class ProductHandler {
    constructor(entity) {
        this.database = entity.mongoClient;
        this.dbName = entity.dbName;
        this.collection =entity.collection;
    }
    getAllProduct() {
        return async(req, res, next) => {
            await this.database.db(`${this.dbName}`).collection(`${this.collection}`).find({}).toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }
}
module.exports = ProductHandler;