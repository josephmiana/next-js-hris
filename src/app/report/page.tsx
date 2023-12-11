"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/reports.css';
import Image from 'next/image';
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';


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
import axios from 'axios';
import toast from 'react-hot-toast';
import router from 'next/router';
import Swal from 'sweetalert2';

const cursorToPointer = {
  cursor: 'pointer',
};

export default function SignupPage() {
  const [uiMode, setUIMode] = useState('main'); 

  const handleSwitchUIMode = (newMode) => {
    setUIMode(newMode);
  };




  const generateAttendance   = async () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8, 11],
    });
  
    const contentElement = document.getElementById('content');
  
    if (contentElement) {
      try {
       
        const canvas = await html2canvas(contentElement, {
          scale: 2,
         
        });
  
        if (!canvas) {
          console.error('Canvas is null.');
          return;
        }
  

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Blob is null.');
            return;
          }
  
          const url = URL.createObjectURL(blob);
  
          // Add the image to the jsPDF instance
          doc.addImage(url, 'JPEG', 1, 0, 9.1, .80);
  
          // Save the PDF
          doc.save('Attendance.pdf');
  
          // Clean up the URL object
          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error('Error during canvas conversion:', error);
      }
    } else {
      console.log('No content element found');
    }
  };
  const [loading, setLoading] = React.useState(false);
  const logout = async () => {
    try{
        await axios.get('/api/users/logout')
         setLoading(true) ;
         Swal.fire({
           position: 'top-end',
           icon: 'success',
           title: 'Logout Success!',
           showConfirmButton: false,
           timer: 2000,
           toast: true,
           background: '#efefef',
           showClass: {
             popup: 'animate__animated animate__fadeInDown',
           },
           hideClass: {
             popup: 'animate__animated animate__fadeOutUp',
           },
         }).then(() => {
           window.location.href = '/login';
         });
   
     }catch(error: any){
         console.log(error.message);
         Swal.fire({
     position: 'top-end', // Position to top-end
     icon: 'error',
     title: 'Unsuccessful Logout!',
     showConfirmButton: false,
     timer: 2000,
     toast: true, // Enable toast mode
     background: '#efefef',
     showClass: {
       popup: 'animate__animated animate__fadeInDown',
     },
     hideClass: {
       popup: 'animate__animated animate__fadeOutUp',
     },
   });
     }finally{
         setLoading(false);
         
     }
     
 }

  const generatePayslip = async () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [10, 16.2],
    });
    
    
    const contentElement = document.getElementById('content');
  
    if (contentElement) {
      try {
     
        const canvas = await html2canvas(contentElement, {
          scale: 2,
         
        });
  
        if (!canvas) {
          console.error('Canvas is null.');
          return;
        }
  
  
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Blob is null.');
            return;
          }
  
          const url = URL.createObjectURL(blob);
  
    
          doc.addImage(url, 'JPEG', .1, 0, 0, .84);
  
          // Save the PDF
          doc.save('Payslip.pdf');
  
          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error('Error during canvas conversion:', error);
      }
    } else {
      console.log('No content element found');
    }
  };
  const generate201file   = async () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8, 11],
    });
  
    const contentElement = document.getElementById('content');
  
    if (contentElement) {
      try {
      
        const canvas = await html2canvas(contentElement, {
          scale: 2,
         
        });
  
        if (!canvas) {
          console.error('Canvas is null.');
          return;
        }
  
       
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Blob is null.');
            return;
          }
          
          const url = URL.createObjectURL(blob);
  
        
          doc.addImage(url, 'JPEG', 1, 0, 9.1, 0);
  
          // Save the PDF
          doc.save('Attendance.pdf');
  
      
          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error('Error during canvas conversion:', error);
      }
    } else {
      console.log('No content element found');
    }
  };

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
 
const printData = () =>{
  console.log('hello');
  
}

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
            <a href="/searchemployee">
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
          <a
                         href="/login"
                            className="logout"
                            onClick={(e) => {
                                e.preventDefault();
                                logout();
                            }}
                        >  
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      {uiMode === 'main' ? (
        <div className="container">
        <button className= "mainbtn"onClick={() => handleSwitchUIMode('attendance')}> <FontAwesomeIcon icon={faClipboardUser} className="fas-button" /><p>Attendance</p></button>
          <button className= "mainbtn" onClick={() => handleSwitchUIMode('Payslip')}> <FontAwesomeIcon icon={faReceipt} className="fas-button" /> <p>  &nbsp;  &nbsp;Payslip</p></button>
          <button className= "mainbtn" onClick={() => handleSwitchUIMode('201File')}> <FontAwesomeIcon icon={faFile} className="fas-button" /><p>  &nbsp;  &nbsp;201files</p></button>
        </div>
      ) : uiMode === 'Payslip' ? (
        // Next UI content here
        
        <div className="container-nextui">
                  <h1>Payslip</h1>

                  <div className="search-form">
        <form>
        <input type="text" id="search-input" />
          <button type="button" onClick={() => {}}>
            Search
          </button>
        </form>
        </div>
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
                             
                              </tbody>
                        </table>
                       
          </div>
          
          </div>
          
          <div className="Selection-Container">
          <div className="MonthSelection">
                <label htmlFor="monthSelect">Select a Month:</label>
                <select id="monthSelect" >
                <option value="" >-- Select Option --</option>
                <option value="" > January </option>
                <option value="" > February </option>
                <option value="" > March </option>
                <option value="" > April </option>
                <option value="" > May </option>
                <option value="" > June </option>
                <option value="" > July </option>
                <option value="" > August </option>
                <option value="" > September  </option>
                <option value="" > October </option>
                <option value="" > November</option>
                <option value="" > December </option>
                
                </select>
                </div>
                <div  className="PeriodSelection" >
                <label htmlFor="periodSelect">Select a Period:</label>
                <select id="periodSelect" >
                  <option value="" >-- Select Option --</option>
                  <option value="" > 1st Period </option>
                  <option value="" > 2nd Period </option>
                  
                </select>
                </div>

                
                </div>
           
                <div className="next-prev">
                <button className="previous-btn" type="button">
      Previous
    </button>
    <button className="next-btn" type="button">
      Next
    </button>
    </div>
 
          <button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generatePayslip}><FontAwesomeIcon icon={ faSave} className="fas-attendance " /><p>Download </p> </button>
          
        </div>
        
      ) : uiMode === 'attendance' ? (
        <div className="container-nextui">
                  <h1>Attendance</h1>
                  <div className="search-form">
        <form>
        <input type="text" id="search-input" />
          <button type="button" onClick={() => {}}>
            Search
          </button>
        </form>
        </div>
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
          <div className="Selection-Container">
          <div className="MonthSelection">
                <label htmlFor="monthSelect">Select a Month:</label>
                <select id="monthSelect" >
                <option value="" >-- Select Option --</option>
                <option value="" > January </option>
                <option value="" > February </option>
                <option value="" > March </option>
                <option value="" > April </option>
                <option value="" > May </option>
                <option value="" > June </option>
                <option value="" > July </option>
                <option value="" > August </option>
                <option value="" > September  </option>
                <option value="" > October </option>
                <option value="" > November</option>
                <option value="" > December </option>
                
                </select>
                </div>
                <div  className="PeriodSelection" >
                <label htmlFor="periodSelect">Select a Period:</label>
                <select id="periodSelect" >
                  <option value="" >-- Select Option --</option>
                  <option value="" > 1st Period </option>
                  <option value="" > 2nd Period </option>
                  
                </select>
                </div>
            
   
                </div>
                <div className="next-prev">
                <button className="previous-btn" type="button">
      Previous
    </button>
    <button className="next-btn" type="button">
      Next
    </button>
    </div>
 
          <button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generateAttendance}><FontAwesomeIcon icon={ faSave} className="fas-attendance " /><p>Download</p> </button>
        
        </div>
      ) : uiMode === '201File' ? (
        // Custom UI content here
        <div className="container-nextui">
        <h1>201 Files Request</h1>
        
        <div className="search-form">
          
        <form>
          
        <input type="text" id="search-input" />
          <button type="button" onClick={() => {}}>
            Search
          </button>
        </form>
        </div>
       
<div id="content">
<div className="201files">

 

      <table>
  <thead>
                  <tr>
                      <th>Name of Requester</th>
                      <th>Request File</th>
                      <th>Description</th>
                      <th>note</th>
                   
                  </tr>
              </thead>
              </table>
</div>
</div>

 
     
<div className="Selection-Container">
     
                </div>
                <div className="next-prev">
                <button className="previous-btn" type="button">
      Previous
    </button>
    <button className="next-btn" type="button">
      Next
    </button>
    </div>
<button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" /><p>Go Back</p></button>
          <button onClick={generate201file}><FontAwesomeIcon icon={faSave} className="fas-attendance" /><p>Download</p></button>
        </div>
      ) : null}
    </div>
  );
}
