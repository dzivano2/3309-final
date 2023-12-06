import React, { useState } from 'react';

// Sample reservations data
const initialReservations = [
  { id: 1, reservationNumber: 'RES001', customerName: 'John Doe', date: '2023-12-10', time: '18:00' },
  { id: 2, reservationNumber: 'RES002', customerName: 'Jane Smith', date: '2023-12-15', time: '19:30' },
  { id: 3, reservationNumber: 'RES003', customerName: 'Alice Johnson', date: '2023-12-20', time: '20:00' },
];

const Reservations = () => {
  const [reservations, setReservations] = useState(initialReservations);
  
  // state managing form states
  const [formData, setFormData] = useState({
    numberOfPeople: '',
    tableNumber: '',
    customerName: '',
  });

  // form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // creates reservation obj
    const newReservation = {
      id: reservations.length + 1,
      reservationNumber: `RES00${reservations.length + 1}`,
      customerName: formData.customerName,
      // add more fields needed for me
    };

    // update reservation state w new reservation
    setReservations((prevReservations) => [...prevReservations, newReservation]);

    // reset form data
    setFormData({
      numberOfPeople: '',
      tableNumber: '',
      customerName: '',
    });
  };

  return (
    <div>
      <h2>Reservations</h2>
      
      <h2>Reservation Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Number of People:
          <input
            type="number"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Table Number:
          <input
            type="text"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Customer Name:
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="selectedDate"
            value={formData.selectedDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit Reservation</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reservation Number</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.reservationNumber}</td>
              <td>{reservation.customerName}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Reservations;
