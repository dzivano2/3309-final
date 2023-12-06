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

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL connected");
});



//test query
// sql;
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Result: " + result);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
