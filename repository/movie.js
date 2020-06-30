'use strict';

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

exports.post = async (body) => {
    let movie = new Movie(body);
    await movie.save();

    return movie;
}

exports.get = async (_q) => {
    let args = {};

    if (_q) {
        args = { name: { $regex: _q, $options: 'i' } }
    }

    let movies = await Movie.find(args);
    return  movies;
}

exports.getById = async (id) => {
    let res = await Movie.findById(id);
    return res;
}