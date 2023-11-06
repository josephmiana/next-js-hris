"use client";
// Make sure to import React from 'react'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/approve.css';
import {
    faChartLine,
    faReceipt,
    faUserPlus,
    faSearch,
    faFile,
    faRightFromBracket,
    faCheck,
    faTimes,
    faHistory
} from '@fortawesome/free-solid-svg-icons';

const cursorToPointer = {
  cursor: "pointer",
};

export default function SignupPage(){

  
  return (
    <div>
      <div className="Sidebar">
        <header className="head"></header>

        <ul>
          <li>
            <a href="#" className="logo">
              <img src="/images/logo.png" alt="" />
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
                            <span className="nav-item">Payslip-Process</span>
                        </a>
                    </li>

                    <li>
                    <a href="/Reports">
            <FontAwesomeIcon icon={faHistory} className="fas" />
            <span className="nav-item">Report</span>
          </a>
        </li>

          <li>
            <a href="Login.html" className="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container">
        <h1>Approval Requests</h1>
        <i className="icon-wrapper check">
          <FontAwesomeIcon icon={faCheck} className="fas" />
        </i>
        <i className="icon-wrapper times">
          <FontAwesomeIcon icon={faTimes} className="fas" />
        </i>
        <table id="clickable-table">
          <thead>
            <tr>
              <th>Requester Name</th>
              <th>Request File</th>
              <th>Description</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {/* You can add your table data here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};


