'use strict';

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const slugGenerator = require('../utils/slug-generator');

exports.post = async (body) => {

    body.slug = slugGenerator.stringToSlug(body.name);

    let movie = new Movie(body);
    await movie.save();

    return movie;
}

exports.get = async (_q) => {
    let args = {};

    if (_q) {
        args = { name: { $regex: _q, $options: 'i' } }
    }

    let movies = await Movie.find(args).populate('category');
    return  movies;
}

exports.getById = async (id) => {
    let res = await Movie.findById(id).populate('category');
    return res;
}