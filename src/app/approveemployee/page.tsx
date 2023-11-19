  "use client";
 import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/approve.css';
import {
    faChartLine,
    faReceipt,
    faUserPlus,
    faSearch,
    faFile,
    faRightFromBracket,
    faFileEdit,
    faHistory,
   faLeftLong,
    faTimes,
    faCheck,
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
                        <a href="/report">
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
                    <h1>Approval Requests</h1>
                    <table id="clickable-table">
                        <thead>
                            <tr>
                                <th>Requester Name</th>
                                <th>Request file</th>
                                <th>Description</th>
                                <th>Note</th>
                                <th>EDIT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mainUIRows.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.requesterName}</td>
                                    <td>{row.requestFile}</td>
                                    <td>{row.requestDescription}</td>
                                    <td>{row.note}</td>
                          <td>
                                    <button className="i" onClick={handleSwitchUIMode}>
                        <FontAwesomeIcon icon={faFileEdit} className="fass" />
                    </button>
                    </td>  
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    
                </div>
            ) : (
                // Next UI content here
                <div className="content-active">
             
                    <form id="employee-form">
            <div className="form-group">
                <label >Requester Name:</label>
                <input type="text" id="Name" />
            </div>

            <div className="form-group">
                <label >Request File:</label>
                <input type="text" id="RequestFile" />
            </div>
            <div className="form-group">
                <label >Description:</label>
                <input type="text" id="Description" />
            </div>
          
            <div className="form-group">
                <label >Note:</label>
                <input type="text" id="Note" />
            </div>
            </form>
                    <button onClick={handleSwitchUIMode}> <FontAwesomeIcon icon={faLeftLong} className="fas-back" /></button>
                    <button onClick={handleSwitchUIMode}> <FontAwesomeIcon icon={faCheck} className="fas-check" /></button>
                    <button onClick={handleSwitchUIMode}> <FontAwesomeIcon icon={faTimes} className="fas-times" /></button>
                </div>
            )}
        </div>
    );
}
