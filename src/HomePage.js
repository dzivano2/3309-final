import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import CSS for styling (you can customize this)
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToReservations = () => {
    navigate('/reservations');
  };

  const goToOrders = () => {
    navigate('/orders');
  };

  const goToInventory = () => {
    navigate('/inventory');
  };

  const goToMenu = () => {
    navigate('/menu');
  };

  const goToEmployee = () => {
    navigate('/employee');
  };


  return (
    <div className="col-md-6">
  <div className="card mb-4">
    <div className="card-body">
      <h2>Employee</h2>
      <p>View and manage employees here.</p>
      <button
        className="btn btn-primary"
        onClick={goToEmployee}
      >
        Go to Employees
      </button>
    </div>
  </div>
    <div className="col-md-6">
  <div className="card mb-4">
    <div className="card-body">
      <h2>Reservations</h2>
      <p>View and manage reservations here.</p>
      <button
        className="btn btn-primary"
        onClick={goToReservations}
      >
        Go to Reservations
      </button>
    </div>
  </div>
  <div className="col-md-6">
  <div className="card mb-4">
    <div className="card-body">
      <h2>Orders</h2>
      <p>Check and process orders in this section.</p>
      <button
        className="btn btn-primary"
        onClick={goToOrders}
      >
        Go to Orders
      </button>
    </div>
  </div>
</div>
<div className="col-md-6">
  <div className="card mb-4">
    <div className="card-body">
      <h2>Inventory</h2>
      <p>Manage inventory and stock levels.</p>
      <button
        className="btn btn-primary"
        onClick={goToInventory}
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
        onClick={goToMenu}
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