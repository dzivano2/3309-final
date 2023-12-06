const express = require("express");
const app = express();

let cors = require("cors");
app.use(cors());

//mysql
let sql = "";
const mysql = require("mysql2");
const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "restaurantdb",
  port: '4000'
});

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "restaurantdb",
  port: '4000'
};

const pool = mysql.createPool(dbConfig);

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

//test query
// sql;
// con.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("Result: " + result);
// });

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

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
