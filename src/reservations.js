import React, { useState } from 'react';

// Sample reservations data (replace with your own data)
const initialReservations = [
  { id: 1, reservationNumber: 'RES001', customerName: 'John Doe', date: '2023-12-10', time: '18:00' },
  { id: 2, reservationNumber: 'RES002', customerName: 'Jane Smith', date: '2023-12-15', time: '19:30' },
  { id: 3, reservationNumber: 'RES003', customerName: 'Alice Johnson', date: '2023-12-20', time: '20:00' },
];

const Reservations = () => {
  // State to manage the reservations data
  const [reservations, setReservations] = useState(initialReservations);

  return (
    <div>
      <h2>Reservations</h2>

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
