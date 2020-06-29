'use strict';

exports.get = (req, res) => {
    let where = '';
    if (req.params.id) where = ' WHERE id = ' + parseInt(req.params.id);
    executeCommand('SELECT * FROM category' + where, res);
};