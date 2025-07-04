const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017');
mongoClient.connect();
const db = mongoClient.db('local');
module.exports = db;
