const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mongoose

// Define collection and schema
let Movie = new Schema({
  movie_name: {
    type: String
  },
  release_year: {
    type: String
  },
  genre: {
    type: Array
  },
  famous: {
    type: String
  }
}, {
  collection: 'movies'
})

module.exports = mongoose.model('Movie', Movie)