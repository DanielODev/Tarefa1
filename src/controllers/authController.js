const express = require('express');
const authMiddleware = require('../middlewares/auth')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ ok: true, Account: req.accountId });
    
});

module.exports = app => app.use('/auth', router);  