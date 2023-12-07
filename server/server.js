const express = require("express");

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
//mysql
const mysql = require("mysql");

const con = mysql.createConnection({

  host: "127.0.0.1",

  user: "DBTeam",
  password: "OurTeam2025",
  database: "restaurantDB"


});

const dbConfig = {
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "restaurantDB" ,
  port:"4000"
};

const pool = mysql.createPool(dbConfig);

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log("MySQL connected");
});



const port = 4001;
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

app.get('/api/inventory/latest-batch', (req, res) => {
    const query = `
      SELECT InventoryName, ExpiryDates, TotalQuantities
      FROM Inventory i1
      WHERE ExpiryDates = (
          SELECT MAX(i2.ExpiryDates)
          FROM Inventory i2
          WHERE i1.InventoryName = i2.InventoryName
      );
    `;
  
    con.query(query, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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


app.get('/api/employees', (req, res) => {
  const sql = 'SELECT * FROM Employee;';
  
  con.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

app.put('/api/employees/:employeeId', (req, res) => {
  const employeeId  = req.params.employeeId;
  const  hourlyWage  = req.body.hourlyWage;

  if (!employeeId || !hourlyWage) {
    return res.status(400).json({ error: 'Employee ID and Hourly Wage are required.' });
  }

  const sql =" UPDATE Employee SET HourlyWage = ? WHERE EmployeeID = ? AND Position = 'Waiter'";
  ;

  con.query(sql, [hourlyWage, employeeId], (err, results) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ success: true, message: 'Employee updated successfully.' });
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
// Assuming 'con' is your MySQL connection and 'app' is your Express app from the provided backend code

// Retrieve all menu items
app.get('/api/menu-items', (req, res) => {
    const sql = 'SELECT Name, Description, Price FROM MenuItem;';
    con.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    });
  });
  // Create a new route to handle the query
// Add a new endpoint to filter menu items based on the specified minimum orders
// Assuming you have already created an Express app and established a MySQL connection

// Define a route to get menu items ordered more than a specified number of times
app.get('/api/menu-items/ordered-more-than/:minOrders', (req, res) => {
    const minOrders = req.params.minOrders;
    const sql = `
      SELECT MenuItemName, COUNT(*) AS TimesOrdered
      FROM OrderDetails
      GROUP BY MenuItemName
      HAVING TimesOrdered > ?;
    `;
  
    con.query(sql, [minOrders], (err, results) => {
      if (err) {
        console.error('Error fetching menu items:', err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.json(results);
    });
  });
  
  
  
  

  
