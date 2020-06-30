'use strict';

const repository = require('../repository/category');

exports.get = async (req, res, next) => {
    try {
        let categories = await repository.get();
        res.status(200).send({ message: 'Lista de categorias recuperada com sucesso!', object: categories });
    } catch (e) {
        res.status(400).send({ message: 'Erro ao recuperar a lista de categorias.', data: e });
    }
};