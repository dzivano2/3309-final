import React, { useState } from "react";
import "./menu.css";

//complex function is changing price of all items that contain specific ingredient
// Sample menu items data (replace with your own data)
const initialMenuItems = [
  { id: 1, name: "Burger", price: 9.99 },
  { id: 2, name: "Pizza", price: 12.99 },
  { id: 3, name: "Pasta", price: 8.99 },
  { id: 4, name: "Salad", price: 6.98 },
];

const Menu = () => {
  // State to manage the menu items data
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  //store user inputs
  const [ingredient, setIngredient] = useState("");
  const [change, setChange] = useState(0);

  function handleIncrease() {}

  return (
    <div>
      <h1>Menu</h1>
      <div id="itemFunction">
        <form onSubmit={handleIncrease}>
          <label>Increase price of dishes that contain: </label>
          <input
            type="text"
            className="inputBox"
            placeholder="Ingredient"
            onChange={(e) => setIngredient(e.target.value)}
          ></input>
          <label>By: </label>
          <input
            type="number"
            className="inputBox"
            placeholder="Change"
            onChange={(e) => setChange(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
      {menuItems.map((menuItem) => (
        <div className="menuItem" key={menuItem.id}>
          <h2 className="itemid">{menuItem.id}</h2>
          <h3 className="itemName">{menuItem.name}</h3>
          <h3 className="itemPrice">${menuItem.price.toFixed(2)}</h3>
        </div>
      ))}
    </div>
  );
};

export default Menu;
