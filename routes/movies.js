'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/movies');

// multer plugin variables config
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.post("/upload", upload.single("image"), function (req, res, next) {
    console.log(req.file);
});

module.exports = router;