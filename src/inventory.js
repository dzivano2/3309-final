import React, { useState, useEffect } from 'react';
import './inventory.css'

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch inventory data
  const fetchInventoryData = () => {
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:4001/api/inventory/latest-batch')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json();
      })
      .then(data => {
        setInventory(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching inventory:', error);
        setError(error.message);
        setIsLoading(false);
      });
  };

  // Fetch inventory data on component mount
  useEffect(() => {
    fetchInventoryData();
  }, []);

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      {isLoading && <p>Loading inventory...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      <button 
        onClick={fetchInventoryData} 
        disabled={isLoading} 
        className="refresh-button"
      >
        Refresh Inventory
      </button>

      <div className="inventory-table-container">
        <table>
          <thead>
            <tr>
              <th>Inventory Name</th>
              <th>Expiry Date</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => {
    // Assuming your dates are in a format that can be directly passed to the Date constructor
             const expiryDate = new Date(item.ExpiryDates).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
    }       );
                return (
                        <tr key={index}>
                        <td>{item.InventoryName}</td>
                        <td>{expiryDate}</td>
                        <td>{item.TotalQuantities}</td>
                </tr>
    );
  })}
</tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
