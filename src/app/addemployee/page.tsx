"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUserPlus,
  faFile,
  faRightFromBracket,
  faSearch,
  faReceipt,
  faHistory,
  faArrowRight,
  faArrowLeft,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "src/styles/addemployee.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Image from 'next/image';
import Swal from "sweetalert2";
export default function Addnew() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    email:"",
    employee_id: "",
    password: "",
    phone: "",
    address: "",
    position: "",
    daysofWork: "",
    rateperDay: "",
  });
  const [loading, setLoading] = React.useState(false);
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

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/addemployee", user);
      console.log('Signup Success', response.data);
      Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: 'Save Success',
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
      window.location.href = "/addemployee";
    } catch (error: any) {
      toast.error(error.message);
      Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: 'Unsuccessful Save!',
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
    } finally {
      setLoading(false);
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
     
 };

  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
  const toggleAddEmployeeForm = () => {
    setShowAddEmployeeForm(!showAddEmployeeForm);
  };

  const [contractType, setContractType] = useState("Regular");

  const handleContractTypeChange = (e) => {
    setContractType(e.target.value);
  };   
  
  const renderContractRow = () => {
    if (contractType === "Contract") {
      return (
        <tr className="row">
          <td>End Of Contract</td>
          <td>
           
            <input type="date" id="dateInputRow2" className="date-inputs" />
             
          </td>
        </tr>
      );
    }
    return null;
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

      <div className="table-container">
        <div className="outer">
          {/*Back Funtion*/}
          {showAddEmployeeForm ? (
            <div className="new-ui">
              <div className="tables">
                <table>
                  <thead>
                    <tr>
                      <th>{loading ? "Processing ..." : "WB MAJESTY"}</th>
                      <th className="requested">Add Employee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="row">
                      <td>Days Of Work</td>
                      <td>
                      <input
                   className=""
                   id="password"
                 type="text"
                placeholder="30 D"
                value={user.daysofWork}
                onChange={(e) => {
                const inputValue = e.target.value;

    
               if (/^\d+$/.test(inputValue) || inputValue === "") {
               setUser({ ...user, daysofWork: inputValue });
    }else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
  }}
/>

                      </td>
                    </tr>
                    <tr className="row">
                      <td>Rate Per Day</td>
                      <td>
                        <input
                    id="rate"
                    type="text"
                   value={user.rateperDay}
                    placeholder="570 PHP"
                   onChange={(e) => {
                     const inputValue = e.target.value;

    
                  if (/^\d+(\.\d+)?$/.test(inputValue) || inputValue === "") {
                 setUser({ ...user, rateperDay: inputValue });
    }else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
  }}
/>

                      </td>
                    </tr>
                    <tr className="row">
                      <td>Work Hours</td>
                      <td>
                      <input
                    className=""
                    id="workhrs"
                    type="text"
                    onChange={(e) => {
                     const inputValue = e.target.value;

   
                    if (/^\d*$/.test(inputValue) || inputValue === "") {
    
                    console.log("Valid input");
                 } else {
    
                  Swal.fire({
                    position: 'top-end', // Position to top-end
                    icon: 'error',
                    title: 'invalid Input!',
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
                 }}
/>


                      </td>
                    </tr>
                    <tr className="row">
                      <td>Break Time</td>
                      <td>
                      <input
                     className=""
                    id="breaktime"
                     type="text"
                    onChange={(e) => {
                     const inputValue = e.target.value;

   
                    if (/^[a-zA-Z0-9\s]*$/.test(inputValue) || inputValue === "") {
      
                    } else {
    
                      Swal.fire({
                        position: 'top-end', // Position to top-end
                        icon: 'error',
                        title: 'invalid Input!',
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
                     }}
    />
    

                      </td>
                    </tr>
                    <tr className="row">
                      <td>Schedule</td>
                      <td>
                      <input
               type="text"
              name="name"
              
                 onChange={(e) => {
                const inputValue = e.target.value;

               if (/^[a-zA-Z]+$/.test(inputValue) || inputValue === "") {
              
                
               
               } else {
    
                Swal.fire({
                  position: 'top-end', // Position to top-end
                  icon: 'error',
                  title: 'invalid Input!',
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
               }}

/>
             


                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="button-container">
              <div className="button-form-previous">
                <button onClick={toggleAddEmployeeForm}><FontAwesomeIcon icon={faArrowLeft} className="fas-previous" /> <span>Previous</span></button>
                


                </div>
                <div className="button-form-save">
                <button onClick={onSignup}><FontAwesomeIcon icon={faSave} className="fas-save" />   <span>Save</span></button>

              </div>
              </div>
              </div>
          ) : (
            <div className="tables">
              <table>
                <thead>
                  <tr>
                    <th>{loading ? "Processing ..." : "Register"}</th>
                    <th className="requested">Add Employee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="row">
                    <td>Employee Name</td>
                    <td>
                     <input
                     type="text"
                   id="employeeNo"
   value={user.name}
  onChange={(e) => {
    const inputValue = e.target.value;

   
    if (/^[a-zA-Z]+$/.test(inputValue) || inputValue === "") {
      setUser({
        ...user,
        name: inputValue,
        password: inputValue,
      });
    }else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
  }}
/>

                    </td>
                  </tr>
                  <tr className="row">
                    <td>Employee ID</td>
                    <td>
                      <input
                        type="text"
                        
                        id="num"
                        value={user.employee_id}
                        onChange={(e) =>
                          setUser({ ...user, employee_id: e.target.value })
                        }
                        
                      />
                    </td>
                  </tr>
                  <tr className="row">
                    <td>Email</td>
                    <td>
                    <input
                type="text"
                  id="email"
                     value={user.email}
                onChange={(e) => {
                const inputValue = e.target.value;

 
    if (/^[a-zA-Z0-9@.]*$/.test(inputValue)) {
      setUser({ ...user, email: inputValue });
    }else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
  
  }}
/>

                    </td>
                  </tr>
                  <tr className="row">
                    <td>Phone No.</td>
                    <td>
                    <input
                  type="text"
                  id="PhoneNo"
                  value={user.phone}
                 onChange={(e) => {
                 const inputValue = e.target.value;

    
                  if (/^\d*$/.test(inputValue) || inputValue === "") {
                setUser({ ...user, phone: inputValue });
    }
    else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
    
  }}
/>

                    </td>
                  </tr>
                  <tr className="row">
                    <td>Employee Address</td>
                    <td>
                    <input
  type="text"
  value={user.address}
  onChange={(e) => {
    const inputValue = e.target.value;

    
    if (/^[a-zA-Z0-9\s]*$/.test(inputValue) || inputValue === "") {
      setUser({ ...user, address: inputValue });
    }
    else {
    
      Swal.fire({
        position: 'top-end', // Position to top-end
        icon: 'error',
        title: 'invalid Input!',
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
  }}
/>

                    </td>
                  </tr>
               
              
                       
                   
                  {renderContractRow()}
                
                  <tr className="row">
                    <td>Role</td>
                    <td>
                      <select
                        className="position"
                        name="position"
                        value={user.position} 
                        onChange={(e) =>
                          setUser({ ...user, position: e.target.value })
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {!showAddEmployeeForm && (
            <div className="btn-form">
              <button onClick={toggleAddEmployeeForm}><span>Next  </span><FontAwesomeIcon icon={faArrowRight} className="fas-next" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
