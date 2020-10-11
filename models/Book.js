const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  volumeInfo: {
    type: Object,
    required: true
  },
  accessInfo: Object,
  saleInfo: Object,
  id: {
    type: String,
    unique: true
  },
  selfLink: String,
  etag: String,
  createdAt: {
    type: Schema.Types.Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
