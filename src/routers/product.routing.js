const express = require('express');
const router = (handler) => {
        const router = express.Router();
        router.get('/getAllProduct', handler.getAllProduct());
        router.get('/getProductDetail/:productId', handler.getProductDetail());
        return router;
}

module.exports = router;