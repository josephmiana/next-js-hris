"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/reports.css';
import {
   faChartLine,
   faReceipt,
   faUserPlus,
   faSearch,
   faFile,
   faRightFromBracket,

   faHistory
} from '@fortawesome/free-solid-svg-icons';

const cursorToPointer = {
   cursor: 'pointer',
};

export default function SignupPage() {
   const [uiMode, setUIMode] = useState('main'); // 'main' or 'next'

   const handleSwitchUIMode = () => {
       setUIMode(uiMode === 'main' ? 'next' : 'main');
   };

   // Sample data for rows in the main UI
   const mainUIRows = [
       { requesterName: '1', requestFile: 'file 1', note: 'Note 1', requestDescription: 'Description 3' },
       { requesterName: '2', requestFile: 'file 2', note: 'Note 2', requestDescription: 'Description  3' },
       { requesterName: '3', requestFile: 'file 3', note: 'Note 3', requestDescription: 'Description  3' },
       // Add more rows as needed
   ];

   return (
       <div>
           <div className="Sidebar">
               <header className="head"></header>

               <ul>
                   <li>
                       <a href="#" className="logo">
                           <img src="/images/logo.png" alt="" />
                       
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

       </div>
   );
}
