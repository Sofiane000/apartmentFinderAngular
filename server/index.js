const express = require("express");

const app = express();

const listingHandler = require("./listing/listing-handler");

const PORT = process.env.PORT || 3000;

// serve static files (parcel bundle and images)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// define listings api
app.get("/api/listings", listingHandler);

// hey, listen! 🧚‍
app.listen(PORT, err => {
  if (err) return console.error(`Error starting server on port ${PORT}:`, err);
  console.log("Server listening on port", PORT);
});
