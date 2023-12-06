import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Sample inventory data (replace with your own data)
const initialInventory = [
  { id: 1, name: 'Item 1', quantity: 10 },
  { id: 2, name: 'Item 2', quantity: 5 },
  { id: 3, name: 'Item 3', quantity: 15 },
];

const Inventory = () => {
  // State to manage the inventory data
  const [inventory, setInventory] = useState(initialInventory);

  return (
    <div>
      <h2>Inventory</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
