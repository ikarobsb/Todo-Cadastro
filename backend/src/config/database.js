const mongoose = require('mongoose')

mongoose.Promise = global.Promise

module.exports = mongoose.connect('mongodb://localhost/todo',{useMongoClient:true})
.then(() => console.log('MongoDB connection succesful'))