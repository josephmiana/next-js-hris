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
import Swal from 'sweetalert2';

export default function Admin() {
  const [page, setPage] = useState(1);
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
  };
  const [overtimeData, setOvertimeData] = useState({
    name: '',
    overtime: 0,
    employee_id: '',
  });
  const [selectedUser, setSelectedUser] = useState<ProductType | null>(null);
  // DISPLAYING FUNCTION
  const  submit = async () => {
    try {
      const res = await axios.post('/api/users/overtime' ,overtimeData)
      if(res.data.success === false)
      {
        Swal.fire({
          position: 'top-end', // Position to top-end
          icon: 'error',
          title: 'This user has already been given an overtime!',
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
      }
      else{
        Swal.fire({
          position: 'top-end', // Position to top-end
          icon: 'success',
          title: 'Overtime has given to this user!',
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
      }
      
    } catch (error: any) {
      console.log(error.message);
    }
    
  }
  function AttendanceRow({ attendanceItem }: ProductRowProps) {
    const handleUserSelect = () => {
      setSelectedUser(attendanceItem);
      setOvertimeData({ ...overtimeData, employee_id: attendanceItem.employee_id, name: attendanceItem.name })

      handleSwitchUIMode(); // Assuming you want to switch UI mode after selecting the user
      
    };
    return (

      <tr>
        <td>{attendanceItem.name}</td>
        <td>{attendanceItem.employee_id}</td>
        <td>{attendanceItem.date}</td>
        <td>{attendanceItem.time_in}</td>
        <td>{attendanceItem.time_out}</td>
      
        <td>
        <button className="i" onClick={handleUserSelect}>
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
 const [loading, setLoading] = React.useState(false);
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

const printData = async () => {
  console.log('this is the user',selectedUser);
  console.log('this is the overtime selected', overtimeData);
  
}
const getBack = async () => {
  setSelectedUser(null);
}
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


   
      <div className="title">
        <h1>Attendance</h1>
      </div>

      <div className="position">
    
     
      </div>
      {uiMode === 'main' ? (
             <div className="outer">
             <div className="table-w">
               <table>
                 <thead>
                   <tr>
                    <th>Name</th>
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
               <div className="btn">
    <button className="previous" type="button">
      Previous
    </button>
    <button className="next" type="button">
      Next
    </button>
    </div>
              </div>
   
             </div>
          
              
   
        ) : (
            <div className="next">
              
                <h1>Overtime</h1>
               
                <div className="overtime-input">
                <select id="overtime" name="overtime" onChange={(e) => setOvertimeData({ ...overtimeData, overtime: parseFloat(e.target.value) })}>
                     <option value ="0">-- Select Hours --</option>  
                      <option value ="1">1 Hour</option>
                      <option value ="2">2 Hours</option>
                      <option value ="3">3 Hours</option>
                      <option value ="4">4 Hours</option></select>
                </div>

                <div className="btn-overtime">
                              <button type="button" onClick={() => submit()}>
                Submit
              </button>
             

                </div>
                <div className="prev">
                              <button type="button" >
                Previous
              </button>
              </div>
            </div>
          
        )}

    
    </div>
  );
};