'use strict';

const repository = require('../repository/movie');

exports.post = async (req, res, next) => {
    try {
        let movie = await repository.post(req.body);
        res.status(201).send({ message: 'Novo filme cadastrado com sucesso!', object: movie });
    } catch (e) {
        res.status(400).send({ message: 'Houve um erro ao cadastrar o filme.', data: e });
    }
};

exports.get = async (req, res, next) => {
    const { search } = req.query;

    try {
        let movies = await repository.get(search);
        res.status(200).send({ message: 'Lista de filmes resgatada com sucesso!', object: movies });
    } catch (e) {
        res.status(400).send({ message: 'Houve um erro ao buscar a lista de filmes', data: e });
    }
};

exports.getById = async (req, res, next) => {
    try {
        let movie = await repository.getById(req.params.id);
        res.status(200).send({ message: 'Filme buscado com sucesso!', object: movie });
    } catch (e) {
        res.status(400).send({ message: 'Houve um erro ao buscar o filme.', data: e });
    }
};