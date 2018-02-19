var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var db = require('./db/dbConnection');
var Movie = require('./models/movieModel');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like https://sebastianudden.github.io/Winter-Games or http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

Movie.find(function (err, movies) {
    if (err) return console.error(err);
    console.log('+++++++++++++++++++++++++ movies ++++++++++++++++++++');
    movies.forEach(movie => {
        console.log('+++ ' + movie.title + ' +++');
        console.log(movie);        
    });
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++')
});
var movieRouter = require('./routes/movieRoutes')(Movie);

app.use('/api/movies', movieRouter);

app.get('/', function(req, res) {
    res.send('Welcome to template-node, a showcase for a RESTful API service');
});

app.listen(port, function() {
    console.log('Running on port: ', port);
});
