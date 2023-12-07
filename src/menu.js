
import React, { useState, useEffect } from "react";
import "./menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemName, setMenuItemName] = useState("");
  const [change, setChange] = useState(0);
  const [minOrders, setMinOrders] = useState(); // Default minimum orders
  const [menuItems2, setMenuItems2] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/menuItems')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data); // Corrected from setEmployees to setMenuItems
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch menu items that have been ordered more than minOrders times
    axios.get(`http://localhost:4000/api/menu-items/ordered-more-than/${minOrders}`)
      .then(response => {
        setMenuItems2(response.data);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, [minOrders]);
  const clearMenu = () => {
    // Clear the menu by setting an empty array
    setMenuItems2([]);
  };

  const handleIncrease = async (e) => {
    e.preventDefault();
  
    try {
      // Make an API call to update the price of a specific menu item
      const response = await fetch(`http://localhost:4000/api/menuItems/${menuItemName}/increaseprice`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increaseAmount: change }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update price');
      }
      const updatedMenuItems = await response.json();
      setMenuItems(updatedMenuItems);
      setChange(0);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
    <div>
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
          {menuItems2.map((menuItem) => (
            <tr key={menuItem.MenuItemName}>
              <td>{menuItem.MenuItemName}</td>
              <td>{menuItem.TimesOrdered}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    <div>
      <h1>Menu</h1>
      <div id="itemFunction">
        <form onSubmit={handleIncrease}>
          <label>Type in MenuItem to Increase the price: </label>
          <input
            type="text"
            className="inputBox"
            placeholder="MenuItemName"
            value={menuItemName}
            onChange={(e) => setMenuItemName(e.target.value)}
          />
          <label>By: </label>
          <input
            type="number"
            className="inputBox"
            placeholder="Change"
            value={change}
            onChange={(e) => setChange(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {menuItems.map((menuItem) => (
        <div className="menuItem" key={menuItem.Name}>
          <h2 className="itemid">{menuItem.Name}</h2>
          <h3 className="itemName">{menuItem.Description}</h3>
          <h3 className="itemPrice">${menuItem.Price}</h3>
        </div>
      ))}
    </div>
    </div>
  );
};
  

export default Menu;

