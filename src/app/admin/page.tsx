"use client";
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/admin1.css';
import {
  faChartLine,
  faUserPlus,
  faFile,
  faSearch,
  faReceipt,
  faRightFromBracket,
  faHistory,

   // Changed from faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  return (
    <div>
    <div className="Sidebar">
      <header className="head"></header>

      <ul>
        <li>
        <a href="#" className="logo">
              <img
                  src="/images/logo.png"
                  width={50}
                  height={50}
                  alt="Picture of the author"
              />
              <span className="nav-e">Admin</span>
            </a>
        </li>

        <li>
          <a href="/admin">
            <FontAwesomeIcon icon={faChartLine} className="fas" />
            <span className="nav-item">Attendance</span>
          </a>
        </li>

        <li>
          <a href="/addemployee">
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
          <a href="/approveemployee">
            <FontAwesomeIcon icon={faFile} className="fas" />
            <span className="nav-item">Request</span>
          </a>
        </li>
        <li>
                      <a href="/process">
                          <FontAwesomeIcon icon={faReceipt} className="fas" />
                          <span className="nav-item">Payslip-process</span>
                      </a>
                  </li>
                  <li>
            <a href="/report">
              <FontAwesomeIcon icon={faHistory} className="fas" />
              <span className="nav-item">Report</span>
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
      <div className="title">
        <h1>Attendance</h1>
      </div>

      <div className="position">
        <aside>
          <p className="compname"> WB Majesty Marketing Corporation</p>
        </aside>
        <aside>
          <p>&nbsp; Name: <span></span> </p>
          <p>&nbsp; Employee ID: </p>
          <p>&nbsp; Position: </p>
        </aside>
      </div>

      <div className="outer">
        <div className="table-w">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
       
      </div>
      <div className="search-form">
        <form>
          Search: <input type="text" id="search-input" />
          <button type="button" onClick={() => {}}>
          <FontAwesomeIcon icon={faSearch} className="fas-search" />
                          <span className="nav-item"></span>
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
