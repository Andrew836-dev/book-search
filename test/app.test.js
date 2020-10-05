const chai = require("chai");
const http = require("chai-http");
chai.use(http);

const expect = chai.expect;
const db = require("../controllers");
const app = require("../app")
const testHTTP = chai.request(app);

const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || "mongodb://localhost/booktest"

describe("Express server instance", function () {
  this.beforeAll(done => {
    // connect to the MongoDB server
    db
      .connect(TEST_MONGODB_URI)
      .then(() => {
        console.log("Database:", db.details());
        // make an open connection to the http server
        testHTTP.keepOpen();
        done();
      })
      .catch(connectionErr => {
        console.log(connectionErr);
        done(connectionErr);
      });
  });

  this.beforeEach(done => {
    // clear the books collection
    db.dropCollection("books")
      .then(() => done())
      // The only error here is if the collection doesn't exist yet
      // which isn't a problem
      .catch(() => done());
  });

  this.afterAll(done => {
    testHTTP.close();
    db.disconnect();
    done();
  });

  it("Serves a html response to a GET request at '/'", done => {
    testHTTP
      .get("/")
      .end((err, res) => {
        if (err) done(err);
        expect(res.type).to.match(/text\/html/);
        done();
      });
  });

  it("Sends a JSON response to '/api/books'", done => {
    testHTTP
      .get("/api/books")
      .set("Accept", "json/application")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Sends an empty JSON array when the database is empty", done => {
    testHTTP
      .get("/api/books")
      .set("Accept", "json/application")
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.be.a("array");
        expect(res.body).to.have.lengthOf(0);
        done();
      });
  });


  it("Accepts a POST request on '/api/books' to save a book to the database", done => {
    const testBook = {
      authors: ["Suzanne Collins"],
      description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
      image: "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      link: "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
      title: "The Hunger Games"
    }
    testHTTP
      .post("/api/books")
      .send(testBook)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        done();
      });
  });

  it("Responds with a populated array after a book is added", done => {
    // sample book object
    const testBook = {
      authors: ["Marijn Haverbeke"],
      description: "This much anticipated and thoroughly revised third edition of Eloquent JavaScript dives deep into the JavaScript language to show you how to write beautiful, effective code.",
      image: "testString for image",
      link: "testSTring for link",
      title: "Eloquent Javascript"
    }
    db
      .saveBook(testBook)
      .then(() => {
        testHTTP
          .get("/api/books")
          .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.have.lengthOf(1);
            done();
          });
      })
      .catch(done);
  });

  it("has a route to DELETE on '/api/books/:id'", done => {
    const testBook = {
      authors: ["Test Author", "Number 3"],
      description: "what an interesting book this is",
      image: "beautiful cover",
      link: "the perfect link",
      title: "What a world we live in"
    }
    db
      .saveBook(testBook)
      .then(dbRes => {
        const id = dbRes._id;
        testHTTP
          .delete("/api/books/" + id)
          .end((delErr, delRes) => {
            if (delErr) done(delErr);
            expect(delRes).to.have.status(200);
            done();
          });
      })
      .catch(done)
  });
});