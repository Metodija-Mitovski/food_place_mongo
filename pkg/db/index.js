const mongoose = require("mongoose");
const config = require("../config");
const cfgDB = config.get("db");

let dsn = `mongodb+srv://${cfgDB.username}:${cfgDB.password}@${cfgDB.host}/${cfgDB.dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  dsn,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.log("Could not connect to db", err);
    }

    console.log("Succesfully connected to db");
  }
);
