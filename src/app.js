var express = require('express'),
    bodParser = require('body-parser'),
    MongoClient= require('mongodb').MongoClient,
    config = require('./app-config.json'),
    ProductHandler = require('./handler/productHandler');
 const swaggerUi = require('swagger-ui-express');
//var swaggerDocument = require('./swagger.json');
var db;


MongoClient.connect(`mongodb://${config.db.url_path}/${config.db.database}`, 
    {useNewUrlParser: true},
    (error, mongoClient) => {
    try {
        if(error) {
            console.log(`Error while connect with ${serverUrl} >>>` ,error);
        }
        console.log('Successfuly connnected to MongoDB');
        startServer(config, mongoClient);
    } catch (error) {
        console.log('Error while start Server >>> ', error);
    }
});


var startServer = (appconfig, mongoClient) => {
    const app =  express();
   
    app.use(bodParser.json());
    //app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res, next) => {
        res.send('Hello world');
    });
    
    app.get('/getAllProduct', 
    new ProductHandler({mongoClient, dbName: appconfig.db.database, collection: 'item'}).getAllProduct());
    
    app.listen(appconfig.app.port, () => {
        console.log(`Server is running on ${appconfig.app.port}`);
    })
}