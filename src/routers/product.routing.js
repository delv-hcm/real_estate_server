const express = require('express');
const router = (handler) => {
        const router = express.Router();
        router.get('/product', handler.getAll());
        router.get('/product/:productId', handler.getDetail());

        return router;
}

module.exports = router;