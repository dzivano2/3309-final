import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import CSS for styling (you can customize this)
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Dashboard</h1>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Reservations</h2>
              <p>View and manage reservations here.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleNavigation('/reservations')}
              >
                Go to Reservations
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Orders</h2>
              <p>Check and process orders in this section.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleNavigation('/orders')}
              >
                Go to Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Inventory</h2>
              <p>Manage inventory and stock levels.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleNavigation('/inventory')}
              >
                Go to Inventory
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2>Menu</h2>
              <p>Update and customize your menu items.</p>
              <button
                className="btn btn-primary"
                onClick={() => handleNavigation('/menu')}
              >
                Go to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
