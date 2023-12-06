const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "mysqlpassword21",
  database: "restaurantDB" 
});

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL connected");
});


app.get("/api/test", (req, res) => {
  res.json({ message: "This is a test route. Server is running!" });
});

//order route
app.get("/api/orders/:menuItemName", (req, res) => {
  const menuItemName = req.params.menuItemName; //extracts menu item from user input
  const sql = `
    SELECT o.orderNumber, o.NumberofItems
    FROM \`Order\` o
    JOIN OrderDetails od ON o.orderNumber = od.orderNumber
    WHERE od.menuItemName = ?;
  `;
  
  con.query(sql, [menuItemName], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});


const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
