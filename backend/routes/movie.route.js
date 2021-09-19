const express = require('express');
const app = express();
const movieRoute = express.Router();

// Movie model
let Movie = require('../model/Movie');

// Add Movie
movieRoute.route('/add-movie').post((req, res, next) => {
  Movie.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all movie
movieRoute.route('/').get((req, res) => {
  Movie.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single movie
movieRoute.route('/read-movie/:id').get((req, res) => {
  Movie.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update movie
movieRoute.route('/update-movie/:id').put((req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log('Movie successfully updated!')
    }
  })
})

// Delete movie
movieRoute.route('/delete-movie/:id').delete((req, res, next) => {
  Movie.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = movieRoute;