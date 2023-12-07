import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Menu = () => {
  const [minOrders, setMinOrders] = useState(); // Default minimum orders
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items that have been ordered more than minOrders times
    axios.get(`http://localhost:4000/api/menu-items/ordered-more-than/${minOrders}`)
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, [minOrders]);
  const clearMenu = () => {
    // Clear the menu by setting an empty array
    setMenuItems([]);
  };


  return (
    <div className="menu-container"> {/* Apply a container class */}
      <h1 className="menu-title">Menu Items Ordered More Than</h1> {/* Apply a title class */}
      <div className="menu-input">
        <label>Minimum Orders:</label>
        <input
          type="number"
          value={minOrders}
          onChange={(e) => setMinOrders(e.target.value)}
        />
        <button onClick={clearMenu}>Clear Menu</button> {/* Add a clear button */}
      </div>
      <table className="menu-table"> {/* Apply a table class */}
        <thead>
          <tr>
            <th>Menu Item</th>
            <th>Times Ordered</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem.MenuItemName}>
              <td>{menuItem.MenuItemName}</td>
              <td>{menuItem.TimesOrdered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
  

export default Menu;

