"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUserPlus,
  faFile,
  faRightFromBracket,
  faSearch,
  faReceipt
} from "@fortawesome/free-solid-svg-icons";

import "src/app/adminstyles/addemp.css";

const AboutMe = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [uiMode, setUIMode] = useState("main"); // 'main' or 'next'

  const navItems = [
 
  ];

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const handleSwitchUIMode = () => {
    setUIMode(uiMode === "main" ? "next" : "main");
  };

 

  return (
    <div>
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
            <a href="/searchemployee" >
              <FontAwesomeIcon icon={faSearch} className="fas" />
              <span className="nav-item">Employee Info</span>
            </a>
          </li>
            <li>
              <a href="/empapprove">
                <FontAwesomeIcon icon={faFile} className="fas" />
                <span className="nav-item">Request</span>
              </a>
            </li>
            <li>
                        <a href="/payslip">
                            <FontAwesomeIcon icon={faReceipt} className="fas" />
                            <span className="nav-item">Payslip</span>
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
      </div>

      {uiMode === "main" ? (
        <div className="content-active">
          <h1>{navItems[activeNavItem]}</h1>
          <div className="table-container">
            <div className="outer">
              <div className="tables">
                <table>
                  <thead>
                    <tr>
                      <th>WB MAJESTY </th>
                      <th className="requested">Add Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="row">
                      <td>Employee Name</td>
                      <td>
                        <input type="text" name="employeeNo" id="employeeNo" />
                      </td>
                    </tr>
                    <tr className="row">
                      <td>Employee ID</td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr className="row">
                      <td>Phone No.</td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr className="row">
                      <td>Employee Address</td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr className="row">
                      <td>Role</td>
                      <td>
                        <select className="roles" name="role">
                          <option value="Admin">Admin</option>
                          <option value="Employee">Employeee</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="btn-form">
                <button onClick={handleSwitchUIMode}>Add Employee</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Next UI content here
        <div className="content-active">
          <h1>Next UI</h1>
         
            <div className="new-ui">
              <div className="tables">
                <table>
                  <thead>
                    <tr>
                      <th>WB MAJESTY </th>
                      <th className="requested">Add Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="row">
                      <td>Days Of Work</td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                    <tr className="row">
                      <td>Rate Per Day</td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-form">
                <button onClick={handleSwitchUIMode}>Back</button>
                <button onClick={() => handleSaveData(activeNavItem)}>
                  Add Salary
                </button>
              </div>
            </div>
          </div>
        
      )}
    </div>
  );
};

export default AboutMe;
