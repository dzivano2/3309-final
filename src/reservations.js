import React, { useState } from 'react';
import './reservations.css'

// Sample data
const initialReservations = [
  { id: 1, reservationNumber: 'RES001', customerName: 'John Doe', date: '2023-12-10', time: '18:00', tableNumber: 3, numberOfPeople: 5},
  { id: 2, reservationNumber: 'RES002', customerName: 'Jane Smith', date: '2023-12-15', time: '19:30', tableNumber: 4, numberOfPeople: 4  },
  { id: 3, reservationNumber: 'RES003', customerName: 'Alice Johnson', date: '2023-12-20', time: '20:00', tableNumber: 2, numberOfPeople: 2 },
];

const errorDiv = document.querySelector('.error');

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
    if (
      !formData.customerName ||
      !formData.tableNumber ||
      !formData.selectedDate ||
      !formData.numberOfPeople ||
      !formData.time
    ) {
      e.preventDefault();
    }
    else{
    e.preventDefault();

    // creates reservation obj
    const newReservation = {
      id: reservations.length + 1,
      reservationNumber: `RES00${reservations.length + 1}`,
      customerName: formData.customerName,
      tableNumber: formData.tableNumber,
      date: formData.selectedDate,
      numberOfPeople: formData.numberOfPeople,
      time: formData.time
      // add more fields needed in the backend check
    };
  



    // update reservation state w new reservation
    setReservations((prevReservations) => [...prevReservations, newReservation]);

    // reset form data
    setFormData({
      numberOfPeople: '',
      tableNumber: '',
      customerName: '',
    });
  }}


  

  const availableTimes = (date, tableNumber) => {
    var count = 0;
    var times= [];
    var availabletime = [];

    //checks if the dates match in the initial array and adds the index of it to an array
    var indexes = initialReservations.reduce((acc, reservation, currentIndex) => {
      if (reservation.date === date) {
        acc.push(currentIndex);
      }  return acc;
    }, []);

    for (var x = 0; x < indexes.length; x++) {
      var index = indexes[x];
      if(initialReservations[index].tableNumber == tableNumber){
        times.push(initialReservations[index].time);
        console.log(initialReservations[index].tableNumber)
        console.log(tableNumber)
      }
    }
  


    for(var i =0; i < 48; i++){
      if (count===3){
        count=0;
      }
      const hours = Math.floor(i / 2);
      const minutes = i % 2 === 0 ? '00' : '30';
      if (!times.includes(hours+":"+minutes) && count===0){
        //console.log(`${hours}:${minutes}`)
        availabletime.push(`${hours}:${minutes}`);
      }
      else{
        count++;
      }
    }
    return availabletime;
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
            type="number"
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
            defaultValue={2023-12-10}
            value={formData.selectedDate}
            onChange={handleInputChange}
          />
        </label>
        {formData.selectedDate && formData.tableNumber && (
          <>
            <label htmlFor="time">Time</label>
            <select id="time" name="time" value={formData.time} onChange={handleInputChange} required>
              <option value="" disabled>Select Time</option>
              {availableTimes(formData.selectedDate, formData.tableNumber).map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </>
        )}
        <br />
        <button type="submit">Submit Reservation</button>
        <div id="error"></div>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ResNum</th>
            <th>Customer Name</th>
            <th>TableNum</th>
            <th>Date</th>
            <th>Time</th>
            <th>NumPeople</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.reservationNumber}</td>
              <td>{reservation.customerName}</td>
              <td>{reservation.tableNumber}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.numberOfPeople}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Reservations;
