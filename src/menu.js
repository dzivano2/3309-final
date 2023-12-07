import React, { useState, useEffect } from "react";
import "./menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [menuItemName, setMenuItemName] = useState("");
  const [change, setChange] = useState(0);

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
  
      // If the API call is successful, you can update the menu items state
      // or fetch the updated menu items from the server and update the state
      // For simplicity, let's assume the server responds with the updated menu items
      const updatedMenuItems = await response.json();
      setMenuItems(updatedMenuItems);
      setChange(0);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  return (
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
  );
};

export default Menu;
