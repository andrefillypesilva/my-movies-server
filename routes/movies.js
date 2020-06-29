'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.get('/', (req, res, next) => {
    let where = '';
    const { search } = req.query;

    if (search != '' && search != undefined) {
        where = ' WHERE m.name LIKE "%' + req.params.search + '%"';
    }
    executeCommand('SELECT m.*, c.name AS "category_name" FROM movies m INNER JOIN Category c ON m.category = c.id' + where, res);
});

router.get('/:id', (req, res, next) => {
    let where = ' WHERE m.id = ' + parseInt(req.params.id);;
    executeCommand('SELECT m.*, c.name AS "category_name" FROM movies m INNER JOIN Category c ON m.category = c.id' + where, res);
});

router.post('/', (req, res, next) => {
    const img = req.body.img;
    const name = req.body.name;
    const category = req.body.category;
    const duration = req.body.duration;

    executeCommand(`INSERT INTO Movies(img, name, category, duration) VALUES ('${img}', '${name}', '${category}', '${duration}')`, res);
});

router.post("/upload", upload.single("image"), function (req, res, next) {
    console.log(req.file);
});

module.exports = router;