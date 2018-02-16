var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = mongoose.Schema({
    title: { type: String },
    director: { type: String },
    genre: { type: String },
    watched: { type: Boolean, default: false }
});

module.exports = mongoose.model('Movie', movieSchema);

