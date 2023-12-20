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
      rateperDay: "",
      startshiftperweek: "", 
      endshiftperweek: "", 
      startshift: "", 
      endshift: "",
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
    
    const fetchId = async () => {
      try {
        const response = await axios.get("/api/users/employeeid")
        setUser({...user, employee_id: response.data.incrementedId})
          console.log(response);
        
      } catch (error:any) {
        console.log(error.message);
      }
    }
    useEffect(() => {
      fetchNotif();
      fetchId();
  },[]);
    const onSignup = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/addemployee", user);
        console.log('Signup Success', response.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Save Success',
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
          // This code will be executed after the Swal.fire animation or timer completes
          window.location.href = "/addemployee";
        });
        
      } catch (error: any) {
        console.log(error.message);
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
                <div className="tables1">
                  <table>
                    <thead>
                      <tr>
                        <th>{loading ? "Processing ..." : "WB MAJESTY"}</th>
                        <th className="requested">Add Employee</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                      <tr className="row">
                        <td className="td-label" >Rate Per Day</td>
                        <td>
                          <input
                      id="rate"
                      type="text"
                    value={user.rateperDay}
                      
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
               
                      
                      </tbody>   
                      </table>  
                      </div>
              <div className="tables2"       >
                <tbody>
                  <table className="shift">
                      <tr className="row">
                        <th>Schedule</th>
        <td>
        <br></br>
          <label className="startShift">Start of Shift: </label>
          <select id="startShiftDay" className="week" value={user.startshiftperweek} onChange={(e) => setUser({...user, startshiftperweek: e.target.value})}>
          <option value=""disabled>Select Day</option>
          <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>

          </select>
          <br></br>
          <label className="endShift">End of Shift: </label>
          <select id="endShiftDay" className="week" value={user.endshiftperweek} onChange={(e) => setUser({...user, endshiftperweek: e.target.value})}>
          <option value=""disabled>Select Day</option>
          <option value="0">Sunday</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            
          </select>

        
        </td>

        <td>
          
<br></br>
<label className="endTime">Time In: </label>

  <select id="endTime" className="week" value={user.startshift}  onChange={(e) => setUser({...user, startshift: e.target.value})}>
  <option value=""disabled>00:00</option>
  <optgroup label="AM">
    <option value="6">06:00 AM</option>
    <option value="7">07:00 AM</option>
    <option value="8">08:00 AM</option>
    <option value="9">09:00 AM</option>
    <option value="10">10:00 AM</option>
    <option value="11">11:00 AM</option>
    <option value="12">12:00 AM</option>
  </optgroup>
  <optgroup label="PM">
    <option value="13">01:00 PM</option>
    <option value="14">02:00 PM</option>
    <option value="15">03:00 PM</option>
    <option value="16">04:00 PM</option>
    <option value="17">05:00 PM</option>
    <option value="18">06:00 PM</option>
    <option value="19">07:00 PM</option>
    <option value="20">08:00 PM</option>
    <option value="21">09:00 PM</option>
    <option value="22">10:00 PM</option>
    <option value="23">11:00 PM</option>
  </optgroup>
  </select>
  <br></br>
  <label className="startTime">Time Out: </label>
  <select id="startTime" className="week" value={user.endshift} onChange={(e) => setUser({...user, endshift: e.target.value})}>
  <optgroup label="AM">
    <option value="6">06:00 AM</option>
    <option value="7">07:00 AM</option>
    <option value="8">08:00 AM</option>
    <option value="9">09:00 AM</option>
    <option value="10">10:00 AM</option>
    <option value="11">11:00 AM</option>
    <option value="12"  disabled>12:00 AM</option>
  </optgroup>
  <optgroup label="PM">
    <option value="13">01:00 PM</option>
    <option value="14">02:00 PM</option>
    <option value="15">03:00 PM</option>
    <option value="16">04:00 PM</option>
    <option value="17">05:00 PM</option>
    <option value="18">06:00 PM</option>
    <option value="19">07:00 PM</option>
    <option value="20">08:00 PM</option>
    <option value="21">09:00 PM</option>
    <option value="22">10:00 PM</option>
    <option value="23">11:00 PM</option>
  </optgroup>
  </select> 
        </td>
      </tr>
      </table>
                    </tbody>
               
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

    
      if (/^[a-zA-Z\s]+$/.test(inputValue) || inputValue === ""){
        setUser({
          ...user,
          name: inputValue,
          password: inputValue,
        });
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
                      <td>Employee ID</td>
                      <td>
                        <input
                          type="text"
                          readOnly
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
                  const limitedValue = inputValue.slice(0, 11);
      
                    if (/^\d*$/.test(inputValue) || inputValue === "") {
                  setUser({ ...user, phone: limitedValue });
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
