class Article {

    constructor(Cursor, collection) {
        this._cursor = Cursor;
        this._collection = collection;
    }

    getAll(){
        return async(req, res, next) => {
            console.log('Request: get all article');
            await this._cursor.collection(`${this._collection}`).find({}).limit(12)
            .toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }

    getDetail(){
        return async(req, res, next) => {
            console.log(req.params);
            const query = {articleId: req.params.articleId};
            console.log('Get Artice detail by id', query);
            await this._cursor.collection(`${this._collection}`).find(query)
            .toArray()
            .then((result) =>{res.send(result)})
            .catch((error) => {res.send({status: "false"})})
            next();
        }
    }

    
}
module.exports = Article;