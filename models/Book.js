const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  authors: Array,
  description: String,
  image: String,
  link: String,
  title: String,
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
