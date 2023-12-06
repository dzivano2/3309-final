import React, { useState } from 'react';

// Sample menu items data (replace with your own data)
const initialMenuItems = [
  { id: 1, name: 'Burger', price: 9.99 },
  { id: 2, name: 'Pizza', price: 12.99 },
  { id: 3, name: 'Pasta', price: 8.99 },
  { id: 4, name: 'Salad', price: 6.99 },
];

const Menu = () => {
  // State to manage the menu items data
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  return (
    <div>
      <h2>Menu</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem.id}>
              <td>{menuItem.id}</td>
              <td>{menuItem.name}</td>
              <td>${menuItem.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
