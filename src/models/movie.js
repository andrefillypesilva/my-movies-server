'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Movie', schema);