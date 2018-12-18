var express = require('express'),
    bodParser = require('body-parser'),
    MongoClient= require('mongodb').MongoClient,
    config = require('./app-config.json'),
    Product = require('./handlers/product.handler'),
    Handler = require('./handlers/handler'),
    router = require('./routers/product.routing'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger-config.json'),
    proxy = require('express-http-proxy'),
    proxy2 = require('http-proxy-middleware');

const reverseproxy = config.reverseproxy;
MongoClient.connect(`mongodb://${config.db.url_path}/${config.db.database}`, 
    {useNewUrlParser: true},
    (error, mongoClient) => {
    try {
        if(error) {
            console.log(`Error while connect with mongodb >>>` ,error);
        }
        console.log('Successfuly connnected to MongoDB');
        startServer(config, mongoClient);
    } catch (error) {
        console.log('Error while start Server >>> ', error);
    }
});


var startServer = (appconfig, mongoClient) => {
    const app =  express();

    const handler= new Handler();
    handler.database = mongoClient;
    handler.dbName = appconfig.db.database;


    app.use(bodParser.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.all("*",function(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          next();
      });
  
    app.use('/api/:url?*', proxy2({
        target: reverseproxy,
        secure: false,
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
        pathRewrite: (path, req) => {
            console.log(path.replace('/api', ''));
            return path.replace('/api', '');
        },
       
       
    }))

    app.get('/', (req, res, next) => {
        res.send('Hello world');
    });

    app.use(router(new Product(handler.Cursor,'item'))); 
    
    app.listen(appconfig.app.port, () => {
        console.log(`Server is running on ${appconfig.app.port}`);
    })
}