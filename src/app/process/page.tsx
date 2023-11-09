"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import 'src/app/adminstyles/process_payslip.css';

import {

 
 
  faRightFromBracket,

  faChartLine,
  faUserPlus,
  faReceipt,
  faFile,
  faEnvelope,
 faHistory,
  faSearch 
} from '@fortawesome/free-solid-svg-icons';



const process = () => {

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
            <a href="/logins" className="logout">
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="center-wrapper">
        <div className="payslip-wrapper">
          <div id="content">
            <div className="payslip-container">
              <div className="header">
                <h1>PAYSLIP PROCESS</h1>
              </div>

            

              {/* Employee information */}
              <div className="employee-info">
                <p>Employee Information</p>
                <div className="info-row">
                  <span className="label">Employee Name:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>
                <div className="info-row">
                  <span className="label">Employee ID:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>

                <div className="info-row">
                  <span className="label">Position:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>
                <div className="info-row">
                  <span className="label">Period Covered:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>

                <div className="info-row">
                  <span className="label">Days of Work:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>
              </div>

              {/* Taxable income */}
              <div className="earnings">
                <h3 className="section-title">Taxable Income</h3>

                <div className="earning-row">
                  <span className="label">Basic Salary:
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
             
             
                </div>
                <div className="earning-row">
                  <span className="label">Overtime:  
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
            
                </div>
                <div className="earning-row">
                  <span className="label">Gross Earnings:
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
             
                </div>
              </div>

              {/* Deductions */}
              <div className="deductions">
                <h3 className="section-title">Deductions</h3>

                <div className="deduction-row">
                  <span className="label">Tax:
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
            
                </div>

                <div className="deduction-row">
                  <span className="label">Pag-Ibig: 
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
              
                </div>

                <div className="deduction-row">
              
                  <span className="label">PhilHealth:
                  
                    <input type="text" name="employeeNo" id="employeeNo" /></span>
                 
                </div>

                <div className="deduction-row">
                  <span className="label">SSS:
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
                 
                </div>
                <div className="deduction-row">
                  <span className="label">Total Contribution:
                  <input type="text" name="employeeNo" id="employeeNo" /></span>
                  
                </div>
              </div>

              {/* Net Pay */}
              <div className="total">
                <span className="label">Net Pay:</span>
                <span className="value"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="new-btn">
            <button className="btn-save"> <FontAwesomeIcon icon={faEnvelope} className="fass" />Save & Submit </button>
               
                </div>
      </div>
   
   </div>
  );
};

export default process;
