//express
const express = require("express");
const app = express();

//mysql
const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
});

//establish connection with database
con.connect(function (err) {
  if (err) throw err;
  console.log("mysql connected");
});

app.use(express.json());

//customer in order where number of items > #
//make reservation
//
//
//

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Using port ${port}`));
