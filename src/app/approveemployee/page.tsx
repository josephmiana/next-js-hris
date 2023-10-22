"use client";
// Make sure to import React from 'react'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/approve.css';
import {
    faClipboardUser,
    faReceipt,
    faQuestionCircle,
    faAddressCard,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';



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
              <FontAwesomeIcon icon={faClipboardUser} className="fas" />
              <span className="nav-item">Attendance</span>
            </a>
          </li>

          <li>
            <a href="/addemployee">
              <FontAwesomeIcon icon={faQuestionCircle} className="fas" />
              <span className="nav-item">Add Employee</span>
            </a>
          </li>

          <li>
            <a href="/approveemployee">
              <FontAwesomeIcon icon={faAddressCard} className="fas" />
              <span className="nav-item">Request</span>
            </a>
          </li>

          <li>
            <a href="/login" className="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container">
        <h1>Approval Requests</h1>
        <table id="clickable-table">
          <thead>
            <tr>
              <th>Requester Name</th>
              <th>Request Description</th>
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


