const express = require('express');
const router = (handler) => {
        const router = express.Router();
        router.get('/project', handler.getAll());
      //  router.get('/project/:projectId', handler.getDetail());
        router.get('/project/:id', handler.getDetailbyId());
        return router;
}

module.exports = router;