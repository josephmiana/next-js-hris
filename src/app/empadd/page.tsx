"use client";
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/addemp.css'; 
import {
  faChartLine,
  faUserPlus,
  faFile,
  faRightFromBracket, 
} from '@fortawesome/free-solid-svg-icons';

const addemp = () => {
  const [formData, setFormData] = useState({
    
  
    salary: '', 
    
  });

  const [isEditingSalary, setIsEditingSalary] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSalary = () => {
    setIsEditingSalary(true);
  };

  const handleSaveSalary = () => {
    setIsEditingSalary(false);
  };


  return (
    <div>
      <div className="Sidebar">
        <header className="head"></header>

        <ul>
          <li>
            <a href="#" className="logo">
              <img src="logo.jpg" alt="" />
            
            </a>
          </li>

          <li>
            <a href="/admin">
              <FontAwesomeIcon icon={faChartLine} className="fas" />
              <span className="nav-item">Attendance</span>
            </a>
          </li>

          <li>
            <a href="/empadd">
              <FontAwesomeIcon icon={faUserPlus} className="fas" />
              <span className="nav-item">Add Employee</span>
            </a>
          </li>

          <li>
            <a href="/empapprove">
              <FontAwesomeIcon icon={faFile} className="fas" />
              <span className="nav-item">Request</span>
            </a>
          </li>

          <li>
            <a href="/logins" className="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="content">
          <h2>ADD NEW EMPLOYEE </h2>

          <table>
            <thead>
              <tr >
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
          
                <th>ID</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" name="firstName " /></td>
             
                <td><input type="text" name="lastName" /></td>


             
                <td><input type="email" name="email" /></td>
                <td> {isEditingSalary ? (
                    <input
                      type="text" // Change the input type to "number" for salary
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{formData.salary}</span>
                  )}</td>
                <td><input type="text" name="ID" /></td>
                <td>
                  <select name="role">
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container">
            <button type="submit">Add User</button>
            <button type="submit">Archive</button>
            <button type="submit">Edit</button>
           
            {isEditingSalary ? (
              <button
                aria-label="Save Salary"
                type="button"
                onClick={handleSaveSalary}
              >
                Save Salary
              </button>
            ) : (
              <button
                aria-label="Edit Salary"
                type="button"
                onClick={handleEditSalary}
              >
                Edit Salary
              </button>
            )}
            <div className="search-form">
        <form>
         <input type="text" id="search-input" />
          <button type="button" onClick={() => {}}>
            Search
          </button>
        </form>
      </div>
          </div>
        </div>
      
      </div>
      
</div>
    
  );
};

export default addemp;

