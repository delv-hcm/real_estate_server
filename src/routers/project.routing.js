const express = require('express');
const router = (handler) => {
        const router = express.Router();
        router.get('/project', handler.getAll());
        router.get('/project/:projectId', handler.getDetail());
        return router;
}

module.exports = router;