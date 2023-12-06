import React, { useState } from 'react';
import { useEffect } from 'react';

const Employee = () =>  {
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
  
    // Fetch all employees when the component mounts
    useEffect(() => {
      fetch('http://localhost:4000/api/employees')
        .then((response) => response.json())
        .then((data) => {
          setEmployees(data);
        })
        .catch((error) => {
          console.error('Error fetching employees:', error);
        });
    }, []);
  
    const handleUpdate = () => {
        fetch(`http://localhost:4000/api/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success or display a message to the user
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        // Handle error or display an error message to the user
      });
    };
  
    return (
      <div>
        <h1>Employee Update</h1>
        <label>
          Employee ID:
          <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        </label>
        <br />
        <button onClick={handleUpdate}>Update Employee Wage</button>
  
        <h2>All Employees</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.EmployeeID}>
              {employee.EmployeeID} - {employee.EmployeeName} - {employee.Position}
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Employee;