const db = require("../models");

module.exports = function(app) {

  app.get("/api/books", (req, res) => {
    db.Book.find()
      .then(dbBooks => {
        res.send(dbBooks);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  });

  app.post("/api/books", (req, res) => {
    const newBook = new db.Book(req.body);
    newBook.save()
      .then(dbBook => {
        res.status(201).send(dbBook);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  });

  app.delete("/api/books/:id", (req, res) => {
    const id = req.params.id;
    db.Book.findByIdAndDelete(id).then(dbResponse => {
      res.send(dbResponse);
    });
  });
}