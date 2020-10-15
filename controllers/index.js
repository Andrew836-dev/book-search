const mongoose = require("mongoose");
const models = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/book-search";

const defaultOptions = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
const db = {
  connect: async function(url = MONGODB_URI, options = defaultOptions) {
    return mongoose.connect(url, options);
  },
  details: function() {
    return mongoose.connection.host;
  },
  disconnect: async function() {
    return mongoose.disconnect();
  },
  dropCollection: async function(collectionName) {
    return mongoose.connection.dropCollection(collectionName);
  },
  getAllBooks: async function() {
    return models.Book.find();
  },
  saveBook: async function(bookData) {
    return models.Book.create(bookData);
  },
  deleteBookWithID: async function(id) {
    return models.Book.findByIdAndDelete(id);
  }
}

module.exports = db;