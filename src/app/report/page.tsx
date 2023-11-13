"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/reports.css';
import jsPDF from 'jspdf';

import html2pdf from 'html2pdf.js';

import {
  faChartLine,
  faReceipt,
  faUserPlus,
  faSearch,
  faFile,
  faRightFromBracket,
  faClipboardUser,
  faHistory,
  faLeftLong,
  faSave,

} from '@fortawesome/free-solid-svg-icons';

const cursorToPointer = {
  cursor: 'pointer',
};

export default function SignupPage() {
  const [uiMode, setUIMode] = useState('main'); // 'main', 'attendance', or 'custom'

  const handleSwitchUIMode = (newMode) => {
    setUIMode(newMode);
  };




  
  const generateAttendance = async () => {
    const doc = new jsPDF({
       orientation: 'landscape',
       unit: 'in',
       format: [8, 11],
    });
   
    let maxPageHeight = doc.internal.pageSize.getHeight(); // Get the maximum y position (height of the page)
   
    const contentElement = document.getElementById('content');
   
    if (contentElement) {
       // Use html2pdf.js to convert HTML to a PDF
       const options = {
         margin: 1,
         filename: 'Attendance.pdf',
         image: { type: 'jpeg', quality: 0.98 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'in', format: [8, 11], orientation: 'landscape' },
       };
   
       html2pdf().from(contentElement).set(options).save();
    } else {
       console.log('No content element found');
    }
   };

  const generatePayslip = async () => {
   const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8, 11],
   });
  
   let maxPageHeight = doc.internal.pageSize.getHeight(); // Get the maximum y position (height of the page)
  
   const contentElement = document.getElementById('content');
  
   if (contentElement) {
      // Use html2pdf.js to convert HTML to a PDF
      const options = {
        margin: 1,
        filename: 'Payslip.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: [8, 11], orientation: 'landscape' },
      };
  
      html2pdf().from(contentElement).set(options).save();
   } else {
      console.log('No content element found');
   }
  };



  const generate201file = async () => {
    const doc = new jsPDF({
       orientation: 'landscape',
       unit: 'in',
       format: [8, 11],
    });
   
    let maxPageHeight = doc.internal.pageSize.getHeight(); // Get the maximum y position (height of the page)
   
    const contentElement = document.getElementById('content');
   
    if (contentElement) {
       // Use html2pdf.js to convert HTML to a PDF
       const options = {
         margin: .5,
         filename: '201File.pdf',
         image: { type: 'PNG', quality: 0.98 },
         html2canvas: { scale: 2 },
         jsPDF: { unit: 'in', format: [8, 11], orientation: 'landscape' },
       };
   
       html2pdf().from(contentElement).set(options).save();
    } else {
       console.log('No content element found');
    }
   };
  

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
            <a href="/searchemployee">
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

      {uiMode === 'main' ? (
        <div className="container">
        <button className= "mainbtn"onClick={() => handleSwitchUIMode('attendance')}> <FontAwesomeIcon icon={faClipboardUser} className="fas-button" /><p>Attendance</p></button>
          <button className= "mainbtn" onClick={() => handleSwitchUIMode('Payslip')}> <FontAwesomeIcon icon={faReceipt} className="fas-button" /> <p>Payslip</p></button>
          <button className= "mainbtn" onClick={() => handleSwitchUIMode('201File')}> <FontAwesomeIcon icon={faFile} className="fas-button" /><p>201files</p></button>
        </div>
      ) : uiMode === 'Payslip' ? (
        // Next UI content here
        
        <div className="container-nextui">
                  <h1>Payslip</h1>
        <div id="content">
        <div className="Payslip">
      
           

                <table>
            <thead>
                            <tr>
                            <th>Name</th>
                                <th>ID</th>
                                <th>Position</th>
                                <th>Period Covered</th>
                                <th>Days of work</th>
                                <th>Basic Salary</th>
                                <th>Overtime</th>
                                <th>Gross Earning</th>
                                <th>Total Deduction</th>
                              
                            </tr>
                          
                        </thead>
                        <tbody>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>

                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              <tr>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>

                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                                <td>asdas</td>
                          
                              
                                
                              </tr>
                              </tbody>
                        </table>
          </div>
          </div>
         
          <button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generatePayslip}><FontAwesomeIcon icon={ faSave} className="fas-attendance " /><p>save </p> </button>
        </div>
        
      ) : uiMode === 'attendance' ? (
        <div className="container-nextui">
                  <h1>Attendance</h1>
        <div id="content">
        <div className="attendance-ui">
      
           

                <table>
            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>Date</th>
                                <th>TimeIn</th>
                                <th>Timeout</th>
                            </tr>
                        </thead>
                        </table>
          </div>
          </div>
          <button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generateAttendance}><FontAwesomeIcon icon={ faSave} className="fas-attendance " /><p>save </p> </button>
        
        </div>
      ) : uiMode === '201File' ? (
        // Custom UI content here
        <div className="container-nextui">
        <h1>201 Files Request</h1>
<div id="content">
<div className="201files">

 

      <table>
  <thead>
                  <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>Date</th>
                      <th>TimeIn</th>
                      <th>Timeout</th>
                  </tr>
              </thead>
              </table>
</div>
</div>
<button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generate201file}><FontAwesomeIcon icon={faSave} className="fas-attendance" /><p>Save</p></button>
        </div>
      ) : null}
    </div>
  );
}
