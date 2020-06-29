'use strict';

exports.post = (req, res, next) => {
    res.status(201).send(req.body);
};

exports.get = (req, res, next) => {
    let where = '';
    const { search } = req.query;

    if (search != '' && search != undefined) {
        where = ' WHERE m.name LIKE "%' + req.params.search + '%"';
    }
    executeCommand('SELECT m.*, c.name AS "category_name" FROM movies m INNER JOIN Category c ON m.category = c.id' + where, res);
};

exports.getById = (req, res, next) => {
    let where = ' WHERE m.id = ' + parseInt(req.params.id);;
    executeCommand('SELECT m.*, c.name AS "category_name" FROM movies m INNER JOIN Category c ON m.category = c.id' + where, res);
};