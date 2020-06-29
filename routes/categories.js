'use strict';
const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    let where = '';
    if (req.params.id) where = ' WHERE id = ' + parseInt(req.params.id);
    executeCommand('SELECT * FROM category' + where, res);
});

module.exports = router;