'use strict';

const mongoose = require('mongoose');
const Category = mongoose.model('Category');

exports.get = async () => {
    let categories = await Category.find();
    return categories;
};

exports.post = async (body) => {
    let category = new Category(body);
    await category.save();

    return category;
}