import React, { useState } from 'react';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [menuItem, setMenuItem] = useState('');
  const [error, setError] = useState(null);

  const fetchOrder = (e) => {
    e.preventDefault()
    setError(null); // Reset error state before making a new request

    fetch(`http://localhost:4001/api/orders/${menuItem}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch orders. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        setError('Failed to fetch orders. Please try again.');
      });
  };

  return (
    <div>
      <h1>Orders</h1>
      <div id="functionality">
        <form onSubmit={fetchOrder}>
          <label>Display orders that contain:</label>
          <input
            onChange={(e) => setMenuItem(e.target.value)}
            type="text"
            className="inputBox"
            placeholder="menu item..."
          />
          <button type="submit">Fetch Orders</button>
        </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {orders.map((order) => (
        <div id='orders' key={order.orderNumber}>
          <h1>Order Number: {order.orderNumber}</h1>
          <h2>Number of Items: {order.NumberofItems}</h2>
        </div>
      ))}
    </div>
  );
};

export default Orders;