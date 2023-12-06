import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// Mock components representing different pages
const Dashboard = () => <h2>Dashboard</h2>;
const Reservations = () => <h2>Reservations</h2>;
const Orders = () => <h2>Orders</h2>;
const MenuManagement = () => <h2>Menu Management</h2>;

const HomePage = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/menu-management">Menu Management</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/reservations">
            <Reservations />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/menu-management">
            <MenuManagement />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default HomePage;
