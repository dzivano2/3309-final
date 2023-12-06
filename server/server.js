//express
const express = require("express");
const app = express();

//mysql
let sql = "";
const mysql = require("mysql2");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

//establish connection with database
con.connect(function (err) {
  if (err) throw err;
  console.log("mysql connected");
});

app.use(express.json());

//test query
// sql;
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Result: " + result);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Using port ${port}`));
