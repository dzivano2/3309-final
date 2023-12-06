const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "restaurantDB" 
});

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL connected");
});



const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
