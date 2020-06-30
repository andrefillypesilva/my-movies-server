'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({ title: "My Movies Server", version: "1.0.3" });
});

module.exports = router;