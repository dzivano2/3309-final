const express = require("express");

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
//mysql
const mysql = require("mysql2");
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



const port = 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));


app.get("/api/orders/:menuItemName", (req, res) => {
  const menuItemName = req.params.menuItemName;
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


app.get('/api/reservations', (req, res) => {
  const query = `
    SELECT 
      r.ReservationID AS id,  
      CONCAT(c.FirstName, ' ', c.LastName) AS customerName, 
      DATE_FORMAT(r.Time, '%Y-%m-%d') AS date,  
      TIME_FORMAT(r.Time, "%H:%i") AS time,  
      r.NumberOfPatrons AS numberOfPeople, 
      r.TableNumber AS tableNumber
    FROM Reservation r
    JOIN Customer c ON r.CustomerID = c.CustomerID
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

app.post('/processReservation', (req, res) => {
  const {
    customerName,
    date,
    time,
    numberOfPeople,
    tableNumber,
  } = req.body;

  

app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM Employee;';
  
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});


  var [firstName, lastName = '1'] = customerName.split(' ');
  const phone = '1111111';

  const rand = Math.floor(Math.random() * (8000 - 3000 + 1)) + 3000;


  const insertCustomerQuery = 'INSERT INTO Customer (CustomerID, FirstName, LastName, PhoneNumber) VALUES (?, ?, ?, ?)';
  pool.query(insertCustomerQuery, [rand, firstName, lastName, phone], (error, results, fields) => {
    if (error) throw error;

    const customerId = rand;

    const insertReservationQuery = 'INSERT INTO Reservation (ReservationID, CustomerID, Time, Status, NumberOfPatrons, TableNumber) VALUES (?, ?, ?, ?, ?, ?)';
    pool.query(insertReservationQuery, [rand, customerId, `${date} ${time}`, 'Pending', numberOfPeople, tableNumber], (error, results, fields) => {
      if (error) throw error;

      const reservationId = rand;

 
      res.json({
        ReservationID: reservationId,
        customerName: `${firstName} ${lastName}`,
        date,
        time,
        numberOfPeople,
        tableNumber,
      });
    });
  });
});
