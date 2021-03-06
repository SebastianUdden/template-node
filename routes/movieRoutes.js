var express = require('express');

var routes = function(Movie) {
    var movieRouter = express.Router();
    movieRouter.route('/')
        .post(function(req, res) {
            var movie = new Movie(req.body);
            movie.save();
            res.status(201).send(movie);
        })
        .get(function(req, res) {
            var query = getQuery(req, ['title', 'genre', 'watched']);
            
            Movie.find(query, function(err, movies) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(movies);
                }
            });
        });
    
    movieRouter.use('/:movieId', function(req, res, next) {
        Movie.findById(req.params.movieId, function(err, movie) {
            if (err) {
                res.status(500).send(err);
            } else if (movie) {
                req.movie = movie;
                next();
            } else {
                res.status(404).send('No movie found');
            }
        });
    });

    movieRouter.route('/:movieId')
        .get(function(req, res) {
            res.json(req.movie);
        })
        .put(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (let property in req.body) {
                req.movie[property] = req.body[property] || req.movie[property];
            }
            req.movie.save();
            res.json(req.movie);
        })
        .patch(function(req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (let property in req.body) {
                req.movie[property] = req.body[property] || req.movie[property];
            }
            req.movie.save();
            res.json(req.movie);
        });
    return movieRouter;
};

function getQuery(req, properties) {
    let query = {};
    for(property of properties) {
        if (req.query[property]) {
            query[property] = req.query[property];
        }
    }
    return query;
}

module.exports = routes;
