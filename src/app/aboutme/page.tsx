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
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from "next/navigation";
import test from 'node:test';
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
  
  const [carm, setcarm] = useState({
    _id: '',
    employee_id: '',
    basic:{
      fullname: '',
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
    educationbg:{
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
      setcarm(response.data.userData[0]);
    } catch (error:any) {
      console.error('Error fetching data:', error.message);
    }
  };

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
  const updateData = async () => {
    try {
      await axios.post('/api/users/aboutme', carm);
    } catch (error:any) {
      console.error('Error pushing data:', error.message);
    }
  };
  
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
  };

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
                icon={faCertificate}
                className="fas"
              />
              <span className="nav-item">CoE Request</span>
            </a>
          </li>
          <li>
            <a href="/aboutme">
              <FontAwesomeIcon icon={faAddressCard} className="fas" />
              <span className="nav-item">About Me</span>
            </a>
          </li>

          <li>
            <a href="/login" className="logout">
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
                  <label>Full Name: </label>
                  {editMode.basicinfo ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={carm.basic.fullname}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, fullname: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.fullname}</span>
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
                        value={carm.basic.religion}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, religion: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.religion}</span>
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
                        value={carm.basic.birthplace}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, birthplace: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.birthplace}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Civil Status: </label>
                  {editMode.basicinfo ? (
                    <>
                      <select
                       
                        name="civilstat"
                        value={carm.basic.status}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, status: e.target.value } }))}
                      >              <option value="male">Married</option>
                      <option value="single">Single</option>
                      <option value="separated">Separated</option>
                      <option value="devorced">Divorced</option>
                      <option value="widow">Widowed</option>
                    </select>
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.status}</span>
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label>Gender: </label>
                  {editMode.basicinfo ? (
                    <>
                      <select
                        
                        name="gender"
                        value={carm.basic.gender}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, gender: e.target.value } }))}
                      > <option value="male">Male</option>
                      <option value="female">Female</option>
                     
                    </select>
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.gender}</span>
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
                        value={"asd"}
                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, phone: e.target.value } }))}
                      />
                    </>
                  ) : (
                    <>
                      <span>{carm.basic.phone}</span>
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

                        onChange={(e) => setcarm((carm) => ({ ...carm, basic: { ...carm.basic, fullname: e.target.value } }))}
                      />


                    </>
                  ) : (
                    <>
                      <span>{}</span>

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

                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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

                       
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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

                       
                      />


                    </>
                  ) : (
                    <>
                      <span>{}</span>

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
                        
                        
                      />


                    </>
                  ) : (
                    <>
                      <span>{}</span>

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
                        
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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
                  <label>Father:</label>
                  {editMode.fambackground ? (
                    <>
                      <input
                        type="text"
                        name="father"
                        
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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
                        
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>Siblings:</label>
                  {editMode.fambackground ? (
                    <>
                      <input
                        type="text"
                        name="father"
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

                    </>
                  )}
                </div>

                <div className="form-group">
                  <label>{"Father's Attainment"}</label>
                  <span id="Father_Attainment">user input</span>
                </div>

                <div className="form-group">
                  <label>{"Mother's Attainment"}</label>
                  <span id="Mother_Attainment">user input</span>
                </div>

                <div className="form-group">
                  <label>{"Father's Occupation"}</label>
                  <span id="Mother_Attainment">user input</span>
                </div>

                <div className="form-group">
                  <label>{"Mother's Occupation"}</label>
                  <span id="Mother_Attainment">user input</span>
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
                  <span id="Tertiary_School">user input</span>
                </div>

                <div className="form-group">
                  <label>Secondary School</label>
                  <span id="Secondary_School">user input</span>
                </div>

                <div className="form-group">
                  <label >Primary School</label>
                  <span id="Primary_School">user input</span>
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
                  <span id="Height"></span>
                </div>

                <div className="form-group">
                  <label>Weight</label>
                  <span id="Weight"></span>
                </div>

                <div className="form-group">
                  <label >Blood Type</label>
                  <span id="Blood_Type"></span>
                </div>
                <div className="form-group">
                  <label >Medical History</label>
                  <span id="Medical_History"></span>
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
                        
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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
                        
                      />



                    </>
                  ) : (
                    <>
                      <span>{}</span>

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