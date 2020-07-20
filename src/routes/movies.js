'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/movies');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.post('/upload/:id', controller.upload);

module.exports = router;