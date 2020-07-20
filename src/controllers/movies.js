'use strict';

const repository = require('../repository/movie');

exports.post = async (req, res, next) => {
    try {
        req.body.category = req.body.category_name;
        delete req.body._id;
        let movie = await repository.post(req.body);
        res.status(201).send({ message: 'Novo filme cadastrado com sucesso!', object: movie });
    } catch (e) {
        res.status(400).send({ message: 'Houve um erro ao cadastrar o filme.', data: e });
    }
};

exports.get = async (req, res, next) => {
    const search = req.query;

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

exports.upload = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({ message: 'É necessário fazer upload de pelo menos 1 arquivo relacionado ao filme.' });
    }

    let data = await repository.getById(req.params.id);

    let movieFile = req.files.img;

    let uploadPath = `${__dirname.replace('controllers', '')}uploads/${data.id}`;

    const fs = require('fs');

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }

    movieFile.mv(`${uploadPath}/${data.img}`, e => {
        if (e)
            return res.status(500).send({ message: 'Não foi possível fazer upload do arquivo, tente editar o filme mais tarde para inserir a imagem.', data: e });

        return res.status(200).send({ data });
    });
}