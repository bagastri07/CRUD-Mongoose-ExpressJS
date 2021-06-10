const mongoose = require('mongoose')
const Schema = mongoose.Schema

const book = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

const author = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    book: [book]
})

module.exports = mongoose.model('Author', author)