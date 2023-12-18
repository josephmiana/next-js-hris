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
      breaktime:"",
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
  <td>Break Time</td>
  <td>
  <input
                      id="rate"
                      type="text"
                    value={user.breaktime}
                
                    onChange={(e) => {
                      const inputValue = e.target.value;

      
                    if (/^\d+(\.\d+)?$/.test(inputValue) || inputValue === "") {
                 
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
          <select id="startShiftDay" className="week">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>
          <br></br>
          <label className="endShift">End of Shift: </label>
          <select id="endShiftDay" className="week">
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
          </select>

        
        </td>

        <td>
          
<br></br>
<label className="endTime">Time In: </label>

  <select id="endTime" className="week">
     <option value="24">00:00</option>
     <option value="6">6:00</option>
    <option value="10">10:00</option>
    <option value="11">11:00</option>
    <option value="12">12:00</option>
    <option value="13">13:00</option>
    <option value="14">14:00</option>
    <option value="15">15:00</option>
    <option value="16">16:00</option>
    <option value="17">17:00</option>
    <option value="18">18:00</option>
    <option value="19">19:00</option>
    <option value="20">20:00</option>
    <option value="21">21:00</option>
    <option value="22">22:00</option>
    <option value="23">23:00</option>
  </select>
  <br></br>
  <label className="startTime">Time Out: </label>
  <select id="startTime" className="week">
    <option value="24">00:00</option>
    <option value="6">6:00</option>
    <option value="10">10:00</option>
    <option value="11">11:00</option>
    <option value="12">12:00</option>
    <option value="13">13:00</option>
    <option value="14">14:00</option>
    <option value="15">15:00</option>
    <option value="16">16:00</option>
    <option value="17">17:00</option>
    <option value="18">18:00</option>
    <option value="19">19:00</option>
    <option value="20">20:00</option>
    <option value="21">21:00</option>
    <option value="22">22:00</option>
    <option value="23">23:00</option>
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
