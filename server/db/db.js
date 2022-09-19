const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/elmabarah", (err) => {
  if (err) return console.log(err);
  console.log("connected successful");
});
