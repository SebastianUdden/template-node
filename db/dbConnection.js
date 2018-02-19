////////////////
// Mongoose
////////////////////////////////////////////////////////////////////////////////
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var connectionString = 'mongodb://Zebudden:f4rs1ght@template-shard-00-00-sagqi.mongodb.net:27017,template-shard-00-01-sagqi.mongodb.net:27017,template-shard-00-02-sagqi.mongodb.net:27017/template?ssl=true&replicaSet=template-shard-0&authSource=admin';
mongoose.connect(connectionString, function (err) {    
    if (err) { throw err; }
    console.log('Successfully connected\r\n');    
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('\n////////////////////////////////////////////////////////////////////////////////');
    console.log('/////////////////// Connection established with ' + db.name + '! //////////////////////');
    console.log('////////////////////////////////////////////////////////////////////////////////\n\n');
});

module.exports = db;