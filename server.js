const app = require("./app");
const PORT = process.env.PORT || 3001;
const db = require("./controllers");

db
  .connect()
  .then(() => {
    console.log("Mongoose Connected to", db.details());
    app.listen(PORT, function () {
      console.log(`🌎 ==> API server now on port ${PORT}!  `);
    });
  })
  .catch(err => console.error(err));
