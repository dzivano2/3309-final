import React, { useState } from 'react';

// Sample orders data (replace with your own data)
const initialOrders = [
  { id: 1, orderNumber: 'ORD001', customerName: 'John Doe', totalAmount: 50.0 },
  { id: 2, orderNumber: 'ORD002', customerName: 'Jane Smith', totalAmount: 75.0 },
  { id: 3, orderNumber: 'ORD003', customerName: 'Alice Johnson', totalAmount: 30.0 },
];

const Orders = () => {
  // State to manage the orders data
  const [orders, setOrders] = useState(initialOrders);

  return (
    <div>
      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order Number</th>
            <th>Customer Name</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.orderNumber}</td>
              <td>{order.customerName}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
