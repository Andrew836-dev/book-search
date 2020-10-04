const chai = require("chai");
const http = require("chai-http");
chai.use(http);

const expect = chai.expect;
const mongoose = require("mongoose");
const app = require("../app")
const testApp = chai.request(app);


describe("Express server instance", function () {
  this.beforeAll(done => {
    testApp.keepOpen();
    mongoose
      .connect("mongodb://localhost/booktest",
        { useNewUrlParser: true, useUnifiedTopology: true },
        err => {
          if (err) {
            console.log(err);
            done(err);
          }
          mongoose.connection.dropCollection("books")
          .then(() => done())
          .catch(done);
        });
  });

  this.afterAll(done => {
    testApp.close();
    mongoose.disconnect();
    done();
  });

  it("Serves a html response to a GET request at '/'", done => {
    testApp
      .get("/")
      .end((err, res) => {
        if (err) done(err);
        expect(res.type).to.match(/text\/html/);
        done();
      });
  });

  it("Sends a JSON response to '/api/books'", done => {
    testApp
      .get("/api/books")
      .set("Accept", "json/application")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends an empty JSON array when the database is empty", done => {
    testApp
      .get("/api/books")
      .set("Accept", "json/application")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });

  const testBook = {
    authors: ["Suzanne Collins"],
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
    image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
    title: "The Hunger Games"
  }

  it("Accepts a POST request on '/api/books' to save a book to the database", done => {
    testApp
      .post("/api/books")
      .send(testBook)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        done();
      });
  });

  it("Responds with a populated array after a book is added", done => {
    testApp
      .get("/api/books")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.have.lengthOf(1);
        done();
      });
  });

  it("has a route to DELETE on '/api/books/:id'", done => {
    testApp
      .get("/api/books")
      .end((getErr, getRes) => {
        if (getErr) done(getErr);
        testApp
          .delete("/api/books/" + getRes.body[0]._id)
          .end((delErr, delRes) => {
            if (delErr) done(delErr);
            expect(delRes).to.have.status(200);
            done();
          });
      });
  });
});