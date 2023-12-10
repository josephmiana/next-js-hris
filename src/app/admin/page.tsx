"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/admin1.css';
import Image from 'next/image';
import {
  faChartLine,
  faUserPlus,
  faFile,
  faSearch,
  faReceipt,
  faRightFromBracket,
  faHistory,
  faFileEdit,

  // Changed from faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Admin() {
  const [employeeData, setemployeeData] = useState({
    _id: '',
    employee_id: '',
    name: '',
    time_in: '',
    time_out: '',
    date: '',
  })
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState<ProductType[]>([]);

  // ALLOCATING FUNCTION
  type ProductRowProps = {
    attendanceItem: ProductType;

    key: React.Key; // You can use 'React.Key' for the type of 'key'
  };

  // TYPE FOR FETCHED DATAS
  type ProductType = {
    _id: string,
    name: string,
    employee_id: string;
    time_in: string;
    time_out: string;
    date: string;
    overTime: string;
  };
  // DISPLAYING FUNCTION
  function AttendanceRow({ attendanceItem }: ProductRowProps) {
    return (
      <tr>
        <td>{attendanceItem.employee_id}</td>
        <td>{attendanceItem.date}</td>
        <td>{attendanceItem.time_in}</td>
        <td>{attendanceItem.time_out}</td>
      
        <td>
        <button className="i" onClick={handleSwitchUIMode}>
                        <FontAwesomeIcon icon={faFileEdit} className="fass" />
        </button>
      </td>
      </tr>
    );
  }
  // USE EFFECT

  const getAttendanceData = async () => {
    try {
      const res = await axios.get(`/api/users/admin?employee_id=${searchTerm}`); // Replace with your actual endpoint
      setAttendanceData(res.data.admin);
      setemployeeData(res.data.adminData)
    } catch (error: any) {
      console.error(error.message);
      // Handle error
    }
  };
  const handleSearch = async () => {
    try {
      // If search term is empty, fetch all data
      if (!searchTerm) {
        getAttendanceData();
        return;
      }
      // Fetch data based on the search term
      const response = await axios.get(`/api/users/admin?employee_id=${searchTerm}`); // Replace with your API endpoint
      setAttendanceData(response.data.admin);
    } catch (error: any) {
      console.error('Error searching data:', error.message);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  const [notif, setNotif] = React.useState(0);
  const fetchNotif = async () => {
    try {
        const response = await axios.get("api/users/notification");
        setNotif(response.data.count)
        
    } catch (error:any) {
      console.log(error.message);
      
    }
  }
  useEffect(() => {
    fetchNotif();
});
const [uiMode, setUIMode] = useState('main'); // 'main' or 'next'

    const handleSwitchUIMode = () => {
        setUIMode(uiMode === 'main' ? 'next' : 'main');
        
    };
  return (
    <div>
      <div className="Sidebar">
        <header className="head"></header>

        <ul>
          <li>
            <a href="#" className="logo">
              <Image
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

        {notif !== 0 && <span className="notification">{notif}</span>}
        
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

        </aside>
      </div>
      {uiMode === 'main' ? (
             <div className="outer">
             <div className="table-w">
               <table>
                 <thead>
                   <tr>
                     <th>ID</th>
                     <th>Date</th>
                     <th>Time In</th>
                     <th>Time Out</th>
                     <th>Over Time</th>
                   </tr>
                 </thead>
                 <tbody>
                   {attendanceData.map((attendanceItem) => (
                     <AttendanceRow
                       key={attendanceItem._id}
                       attendanceItem={attendanceItem}
                     />
                   ))}
                 
                 </tbody>
               </table>
     
             </div>
           </div>
              
   
        ) : (
            <div className="next">
                <h1>Overtime</h1>
               
                <div className="overtime-input">
                    <input type="text" id="overtime" name="overtime" />
                </div>

                <div className="btn-overtime">
                <button type="button" onClick={() => { }}>
                   Submit
                 </button>
                </div>
            </div>
          
        )}

    
    </div>
  );
};