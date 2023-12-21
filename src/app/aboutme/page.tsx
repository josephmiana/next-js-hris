"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/aboutme.css';
import Image from 'next/image';
import {
  faClipboardUser,
  faReceipt,
  faQuestionCircle,
  faAddressCard,
  faRightFromBracket,
  faUser,
  faHouse,
  faUserGroup,
  faGraduationCap,
  faMedkit,
  faBicycle,
  faClock,
  faFolder
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import test from 'node:test';
import { info } from 'console';
export default function AboutMePage() {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const navItems = [
    'Basic Information',
    'Address Information',
    'Family Background',
    'Educational Background',
    'Medical Information',
    'Skills & Hobbies',

  ];
  
  const [information, setInformation] = useState({
    _id: '',
    employee_id: '',
    basic:{
      firstname: '',
      middlename: '',
      lastname: '',
      religion: '',
      birthplace: '',
      status: '',
      gender: '',
      phone: '',
    },
    address:{
      blk: '',
      street: '',
      barangay: '',
      city: '',
      region: '',
      zipcode: '',
    },
    familybg:{
      father_name: '',
      mother_name: '',
      sibling: '',
      father_attainment: '',
      mother_attainment: '',
      father_occupation: '',
      mother_occupation: '',
    },
    educationalbg:{
      tertiary: '',
      secondary: '',
      primary: '',
    },
    medical:{
      height: '',
      weight: '',
      bloodtype: '',
      medicalhistory: '',
    },
    skillandhobby:{
      skill: '',
      hobby: '',
    },
  });
  useEffect(() => {
    
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/users/aboutme');
      setInformation(response.data.userData[0]);
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
  const updateData = async () => {
  
    try {
      const isValid = validateInput();
  
      if (isValid) {
        await axios.post('/api/users/aboutme', information);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Updated Successfully!',
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
        });
        return true;
      }
    } catch (error) {
 
      console.error(error);
    }
  };

  const validateInput = () => {
    let isValid = true;

    if (!/^[a-zA-Z]*$/.test(information.basic.firstname)) {
      showValidationError('Invalid Input for Firstname! Please enter only Letters ');
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.basic.middlename)) {
      showValidationError('Invalid Input for Middle Name! Please enter only Letters');
      isValid = false;
    }if (!/^[a-zA-Z\s]*$/.test(information.basic.lastname)) {
      showValidationError('Invalid Input for Last Name! Please enter only Letters ');
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.basic.religion)) {
      showValidationError('Invalid Input for Religion! Please enter only Letters ');
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.basic.birthplace)) {
      showValidationError('Invalid Input for BirthPlace! Please enter only Letters');
      isValid = false;
    }
    if (!/^\d{11}$/.test(information.basic.phone)) {
      showValidationError('Invalid Input for Phone No! Please enter only numbers');
      isValid = false;
    } 
    //address info
    if (!/^\d*$/.test(information.address.blk)) {
      showValidationError('Invalid Input for Block No. Please enter only numbers')
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.address.street)) {
      showValidationError('Invalid Input for Street! Please enter only Letters  ');
      isValid = false;
    }
    if (!/^[a-zA-Z0-9\s]*$/.test(information.address.barangay)) {
      showValidationError('Invalid Input for Barangay! Please enter only Letters and numbers');
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.address.city)) {
      showValidationError('Invalid Input for City! Please enter only Letters');
      isValid = false;
    }
    if (!/^[a-zA-Z\s]*$/.test(information.address.region)) {
      showValidationError('Invalid Input for Region! Please enter only Letters');
      isValid = false;
    }
    if (!/^\d*$/.test(information.address.zipcode)) {
      showValidationError('Invalid Input for ZipCode! Please enter only numbers');
      isValid = false;
    }
    //fambg
    if (!/^[a-zA-Z\s]*$/.test(information.familybg.father_name)) {
      showValidationError('Invalid Input for Father Name! Please enter only Letters');
      isValid = false;
    }

    if (!/^[a-zA-Z\s]*$/.test(information.familybg.mother_name)) {
      showValidationError('Invalid Input for Mother Maiden Name! Please enter only Letters');
      isValid = false;
    }
    if (!/^\d*$/.test(information.familybg.sibling)) {
      showValidationError('Invalid Input for No of Siblings! Please enter only Letters');
      isValid = false;
    }
    //skill and hobby
    if (!/^[a-zA-Z\s]*$/.test(information.skillandhobby.skill)) {
      showValidationError('Invalid Input for  Skill! Please enter only Letters');
      isValid = false;
    }
    
    if (!/^[a-zA-Z\s]*$/.test(information.skillandhobby.hobby)) {
      showValidationError('Invalid Input for  Hobby! Please enter only Letters');
      isValid = false;
    }
    return isValid;
};
const showValidationError = (message) => {
  Swal.fire({
    position: 'top-end',
    icon: 'warning',
    title: message,
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
  });
};
  
  const logout = async () => {
    try{
       await axios.get('/api/users/logout')
        setLoading(true);
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
  const [editMode, setEditMode] = useState({
    basicinfo: false,
    AddressInfo: false,
    fambackground: false,
    educbackground: false,
    medBackground: false,
    skillhobby: false,
  });

  const handleEditClick = (fieldName) => {
    setEditMode({
      ...editMode,
      [fieldName]: true,
    });
  };

  const handleSaveClick = (fieldName) => {
    setEditMode({
      ...editMode,
      [fieldName]: false,
    });
    updateData();
  };
  const [error, setError] = useState('');
  return (
    <div>
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
              <span className="nav-e">Employee</span>
              
            </a>
          </li>
          <li>
						<a href="/time">
            <FontAwesomeIcon
								icon={faClock}
								className="fas"
							/>
							<span className="nav-item">TimeIn</span>
						</a>
					</li>
          <li>
            <a href="/dashboard">
              <FontAwesomeIcon icon={faClipboardUser} className="fas" />
              <span className="nav-item">Attendance</span>
            </a>
          </li>
          <li>
            <a href="/payslip">
              <FontAwesomeIcon icon={faReceipt} className="fas" />
              <span className="nav-item">Payslip</span>
            </a>
          </li>
          <li>
            <a href="/201files">
              <FontAwesomeIcon icon={faQuestionCircle} className="fas" />
              <span className="nav-item">201 files</span>
            </a>
          </li>
       
       

          <li>
            <a href="/coe">
              <FontAwesomeIcon
                icon={faFolder}
                className="fas"
              />
              <span className="nav-item">Document Request</span>
            </a>
          </li>
          <li>
            <a href="/aboutme">
              <FontAwesomeIcon icon={faAddressCard} className="fas" />
              <span className="nav-item">About Me</span>
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


      <div className="box1">

        <p>Employee</p>
        <button className='p=5 color=green' onClick={() => updateData()}></button>
      </div>

      <div className="box2">
        <ul style={{ listStyle: 'none' }}>
          <p>Employee Information</p>
          {navItems.map((item, index) => (
            <li key={index}>
              <a onClick={() => handleNavItemClick(index)}>
              <FontAwesomeIcon icon={getIconForNavItem(index)} className="fas" />
                <span className={`nav-item ${index === activeNavItem ? 'active' : ''}`}>{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="box3">{renderContentForNavItem(activeNavItem)}</div>
    </div>
    </div>
  );
  function getIconForNavItem(index) {
    const icons = [faUser, faHouse, faUserGroup, faGraduationCap, faMedkit, faBicycle];
    return icons[index];
  }
  function renderContentForNavItem(index) {
    switch (index) {
      case 0:
        return (
          <div className="content-active">
            <h1>Basic Information</h1>
            <div className="employee-info">
              <div className="details">

              <div className="form-group">
                  <label>First Name: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                       
                        name="name"
                        value={information.basic.firstname} 
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, firstname: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{} </span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Middle Name: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                       
                        name="name"
                        value={information.basic.middlename} 
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, fullname: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Last Name: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                       
                        name="name"
                        value={information.basic.lastname} 
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, fullname: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.basic.lastname}</span>
                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>Religion: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                        name="religion"
                        value={information.basic.religion}
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, religion: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.basic.religion}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Birthplace: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                        name="birthplace"
                        value={information.basic.birthplace}
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, birthplace: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.basic.birthplace}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Civil Status: </label>
                  {editMode.basicinfo ? (
                    <>
                      <select
                       
                        name="civilstat"
                        value={information.basic.status}
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, status: e.target.value } }))}
                      >         <option value="Married">Married</option>
                      <option value="single">Single</option>
                      <option value="separated">Separated</option>
                      <option value="divorced">Divorced</option>
                      <option value="window">Widowed</option>
                     
                    </select>
                    </>
                  ) : (
                    <>
                      <span>{information.basic.status}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Gender: </label>
                  {editMode.basicinfo ? (
                    <>
                      <select
                        
                        name="gender"
                        value={information.basic.gender}
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, gender: e.target.value } }))}
                      > <option value="male">Male</option>
                      <option value="female">Female</option>
                     
                    </select>
                    </>
                  ) : (
                    <>
                      <span>{information.basic.gender}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Phone No: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                        name="gender"
                        value={information.basic.phone}
                        onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, phone: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.basic.phone}</span>
                    </>
                  )}
                </div>
                <div className="btn my-custom-btn">

                  {editMode.basicinfo ? (
                    <>




                      <button onClick={() => handleSaveClick('basicinfo')}>Save</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick('basicinfo')}>Edit</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (

          <div className="content active">
            
            <h1>Address Information</h1>
            <div className="employee-info">
              <div className="details">

                <div className="form-group">
                  <label>BlkNo:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="blk"

                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, blk: e.target.value } }))}
                      />


                    </>
                  ) : (
                    <>
                      <span>{information.address.blk}</span>

                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Street:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="street"

                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, street: e.target.value } }))}
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.address.street}</span>

                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Barangay:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="barangay"
                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, barangay: e.target.value } }))}
                       
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.address.barangay}</span>

                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>City:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="city"
                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, city: e.target.value } }))}
                       
                      />


                    </>
                  ) : (
                    <>
                      <span>{information.address.city}</span>

                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Region:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="Region"
                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, region: e.target.value } }))}
                        
                      />


                    </>
                  ) : (
                    <>
                      <span>{information.address.region}</span>

                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>ZipCode:</label>
                  {editMode.AddressInfo ? (
                    <>
                      <input
                        type="text"
                        name="ZipCode"
                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, zipcode: e.target.value } }))}
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.address.zipcode}</span>

                    </>
                  )}
                </div>



                <div className="btn my-custom-btn">

                  {editMode.AddressInfo ? (
                    <>




                      <button onClick={() => handleSaveClick('AddressInfo')}>Save</button>
                    </>
                  ) : (
                    <>

                      <button onClick={() => handleEditClick('AddressInfo')}>Edit</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );


      case 2:
        return (
          <div className="content active">
            <h1>Family Background</h1>
            <div className="employee-info">
              <div className="details">



                <div className="form-group">
                  <label>Father Name:</label>
                  {editMode.fambackground ? (
                    <>
                      <input
                        type="text"
                        name="father"
                        onChange={(e) => setInformation((information) => ({ ...information, familybg: { ...information.familybg, father_name: e.target.value } }))}
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.familybg.father_name}</span>

                    </>
                  )}
                </div>


                <div className="form-group">
                  <label>Mother Maiden Name:</label>
                  {editMode.fambackground ? (
                    <>
                      <input
                        type="text"
                        name="father"
                        value={information.familybg.mother_name}
                        onChange={(e) => setInformation((information) => ({ ...information, familybg: { ...information.familybg, mother_name: e.target.value } }))}
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.familybg.mother_name}</span>

                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>No Siblings:</label>
                  {editMode.fambackground ? (
                    <>
                      <input
                        type="text"
                        name="father"
                        value={information.familybg.sibling}
                        onChange={(e) => setInformation((information) => ({ ...information, familybg: { ...information.familybg, sibling: e.target.value } }))}
                      />



                    </>
                  ) : (
                    <>
                      <span>{information.familybg.sibling}</span>

                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>{"Father's Attainment"}</label>
                  <span id="Father_Attainment">{information.familybg.father_attainment}</span>
                </div>

                <div className="form-group">
                  <label>{"Mother's Attainment"}</label>
                  <span id="Mother_Attainment">{information.familybg.mother_attainment}</span>
                </div>

                <div className="form-group">
                  <label>{"Father's Occupation"}</label>
                  <span id="Mother_Attainment">{information.familybg.father_occupation}</span>
                </div>

                <div className="form-group">
                  <label>{"Mother's Occupation"}</label>
                  <span id="Mother_Attainment">{information.familybg.mother_occupation}</span>
                </div>
                <div className="btn my-custom-btn">

                  {editMode.fambackground ? (
                    <>
                      <button onClick={() => handleSaveClick('fambackground')}>Save</button>
                    </>
                  ) : (
                    <>

                      <button onClick={() => handleEditClick('fambackground')}>Edit</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="content active">
            <h1>Educational Background</h1>
            <div className="employee-info">
              <div className="details">


                <div className="form-group">
                  <label>Tertiary School </label>
                  <span id="Tertiary_School">{information.educationalbg.tertiary}</span>
                </div>

                <div className="form-group">
                  <label>Secondary School</label>
                  <span id="Secondary_School">{information.educationalbg.secondary}</span>
                </div>

                <div className="form-group">
                  <label >Primary School</label>
                  <span id="Primary_School">{information.educationalbg.primary}</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="content active">
            <h1>Medical Information</h1>
            <div className="employee-info">
              <div className="details">
                <div className="form-group">
                  <label>Height </label>
                  <span id="Height">{information.medical.height}</span>
                </div>

                <div className="form-group">
                  <label>Weight</label>
                  <span id="Weight">{information.medical.weight}</span>
                </div>

                <div className="form-group">
                  <label >Blood Type</label>
                  <span id="Blood_Type">{information.medical.bloodtype}</span>
                </div>
                <div className="form-group">
                  <label >Medical History</label>
                  <span id="Medical_History">{information.medical.medicalhistory}</span>
                </div>

              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="content active">
            <h1>Skills & Hobbies</h1>
            <div className="employee-info">
              <div className="details">
                <div className="form-group">
                  <label>Skill</label>
                  {editMode.skillhobby ? (
                    <>
                      <input
                        type="text"
                        name="skill"
                        onChange={(e) => setInformation((information) => ({ ...information, skillandhobby: { ...information.skillandhobby, skill: e.target.value } }))}
                        
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.skillandhobby.skill}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Hobbies</label>
                  {editMode.skillhobby ? (
                    <>
                      <input
                        type="text"
                        name="hobby"
                        onChange={(e) => setInformation((information) => ({ ...information, skillandhobby: { ...information.skillandhobby, hobby: e.target.value } }))}
                        
                      />
                    </>
                  ) : (
                    <>
                      <span>{information.skillandhobby.hobby}</span>

                    </>
                  )}
                </div>
                <div className="btn my-custom-btn">

                  {editMode.skillhobby ? (
                    <>
                      <button onClick={() => handleSaveClick('skillhobby')}>Save</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick('skillhobby')}>Edit</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
};