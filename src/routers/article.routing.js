const express = require('express');
const router = (handler) => {
        const router = express.Router();


        router.get('/article', handler.getAll());
        router.get('/article/:articleId', handler.getDetail());

        return router;
}

module.exports = router;