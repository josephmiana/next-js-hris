"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/aboutme.css';
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
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useRouter} from "next/navigation";
export default function AboutMePage() {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const router = useRouter();
  const [userdata, setData] = React.useState({
    religion: "", 
    birthplace: "", 
    status: "", 
    address: "", 
    gender: "", 
    phone: "", 
    father: "", 
    mother: "", 
    siblings: "", 
    father_attainment: "", 
    mother_attainment: "", 
    father_occupation: "", 
    mother_occupation: "",
  });
  const get = async () => {
    const res = await axios.get("/api/users/aboutmeget");
    setData({
      religion: res.data.user.religion,
      birthplace: res.data.user.birthplace,
      status: res.data.user.status,
      address: res.data.user.address,
      gender: res.data.user.gender,
      phone: res.data.user.phone,
      father: res.data.user.father,
      mother: res.data.user.mother,
      siblings: res.data.user.siblings,
      father_attainment: res.data.user.father_attainment,
      mother_attainment: res.data.user.mother_attainment,
      father_occupation: res.data.user.father_occupation, 
      mother_occupation: res.data.user.mother_occupation,
    });
  };
  useEffect(() => {
    get();
  }, []);
  const [loading, setLoading] = React.useState(false);
  const navItems = [
    'Basic Information',
    'Address Information',
    'Family Background',
    'Educational Background',
    'Medical Information',
    'Skills & Hobbies',
    
  ];

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };

  const [formData, setFormData] = useState({
    //basic info
    status: 'asd',
    religion: '',
    birthpalce:'',
    Phone:'',
    gender:'',
  //address info
  blk: '',
  street: '',
 barangay:'',
  city:'',
  region:'',
  zipcode:'',
  //fam back 
  father: '',
    M_maiden: '',
    sibling: '',
    F_Attainment: '',
    M_Attainment: '',
    M_Occupation: '',
    F_Occupation: '',
  });
  const [editMode, setEditMode] = useState({
    status: false,
    religion: false,
    birthpalce:false,
    Phone:false,
    gender:false,
    //address info
    blk: false,
    street: false,
    barangay: false,
    city:false,
    region:false,
    zipcode:false,
    //fam back
    father: false,
    M_maiden: false,
    sibling: false,
    F_Attainment: false,
    M_Attainment: false,
    M_Occupation: false,
    F_Occupation: false,
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
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <div>
      <div className="Sidebar">
        <header className="head"></header>

        <ul>
          <li>
            <a href="#" className="logo">
              <img src="/images/logo.png" alt="" />
              <span className="nav-e">Employee</span>
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
            <a href="/aboutme">
              <FontAwesomeIcon icon={faAddressCard} className="fas" />
              <span className="nav-item">About Me</span>
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

      
      <div className="box1">

             <p>Employee</p>

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
   
  );
  function getIconForNavItem(index) {
    const icons = [faUser, faHouse, faUserGroup, faGraduationCap, faMedkit, faBicycle];
    return icons[index];
  }

  


  
  function renderContentForNavItem(index) {
    switch (index) {
      case 0:
        return (
          <div className="content active">
            <h1>Basic Information</h1>
            <div className="employee-info">

              <div className="details">
              <div className="form-group">
        <label>Religion: </label>
        {editMode.religion ? (
          <>
            <input
              type="text"
              name="religion"
              value = ""
              onChange={(e) => handleInputChange(e, 'religion')}
            />

             
            <button onClick={() => handleSaveClick('religion')}>Save</button>
          </>
        ) : (
          <>
            <span>asdadas</span>
            <button onClick={() => handleEditClick('religion')}>Edit</button>
          </>
        )}
  </div>

      <div className="form-group">
        <label>Birthplace: </label>
        {editMode.birthpalce ? (
          <>
            <input
              type="text"
              name="birthplace"
              value={formData.birthpalce}
              onChange={(e) => handleInputChange(e, 'birthplace')}
            />

             
            <button onClick={() => handleSaveClick('birthplace')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('birthplace')}>Edit</button>
          </>
        )}
      </div>

      <div className="form-group">
        <label>Status:</label>
        {editMode.status ? (
          <>
            <input
              type="text"
              name="gender"
              value={formData.status}
              onChange={(e) => handleInputChange(e, 'status')}
            />

             
            <button onClick={() => handleSaveClick('status')}>Save</button>
          </>
        ) : (
          <>
            <span>{userdata.status}</span>
            <button onClick={() => handleEditClick('status')}>Edit</button>
          </>
        )}
      </div>

      <div className="form-group">
        <label>Gender:</label>
        {editMode.gender ? (
          <>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange(e, 'gender')}
            />

             
            <button onClick={() => handleSaveClick('gender')}>Save</button>
          </>
        ) : (
          <>
            <span>{userdata.gender}</span>
            <button onClick={() => handleEditClick('gender')}>Edit</button>
          </>
        )}
      </div>
           
      <div className="form-group">
        <label>PhoneNo:</label>
        {editMode.Phone ? (
          <>
            <input
              type="text"
              name="Phone"
              value={formData.gender}
              onChange={(e) => handleInputChange(e, 'gender')}
            />

             
            <button onClick={() => handleSaveClick('gender')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('gender')}>Edit</button>
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
        {editMode.blk ? (
          <>
            <input
              type="text"
              name="blk"
              value={formData.blk}
              onChange={(e) => handleInputChange(e, 'blk')}
            />

             
            <button onClick={() => handleSaveClick('blk')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('blk')}>Edit</button>
          </>
        )}
      </div>
      <div className="form-group">
        <label>Street:</label>
        {editMode.street ? (
          <>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={(e) => handleInputChange(e, 'street')}
            />

             
            <button onClick={() => handleSaveClick('street')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('street')}>Edit</button>
          </>
        )}
      </div>
      <div className="form-group">
        <label>Barangay:</label>
        {editMode.barangay ? (
          <>
            <input
              type="text"
              name="barangay"
              value={formData.barangay}
              onChange={(e) => handleInputChange(e, 'barangay')}
            />

             
            <button onClick={() => handleSaveClick('barangay')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('barangay')}>Edit</button>
          </>
        )}
      </div>
      <div className="form-group">
        <label>City:</label>
        {editMode.city ? (
          <>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => handleInputChange(e, 'city')}
            />

             
            <button onClick={() => handleSaveClick('city')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('city')}>Edit</button>
          </>
        )}
      </div>
      <div className="form-group">
        <label>Region:</label>
        {editMode.city ? (
          <>
            <input
              type="text"
              name="Region"
              value={formData.region}
              onChange={(e) => handleInputChange(e, 'region')}
            />

             
            <button onClick={() => handleSaveClick('region')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('region')}>Edit</button>
          </>
        )}
      </div>
            
      <div className="form-group">
        <label>ZipCode:</label>
        {editMode.city ? (
          <>
            <input
              type="text"
              name="ZipCode"
              value={formData.zipcode}
              onChange={(e) => handleInputChange(e, 'zipcode')}
            />

             
            <button onClick={() => handleSaveClick('zipcode')}>Save</button>
          </>
        ) : (
          <>
            <span></span>
            <button onClick={() => handleEditClick('zipcode')}>Edit</button>
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
        {editMode.father ? (
          <>
            <input
              type="text"
              name="father"
              value={formData.father}
              onChange={(e) => handleInputChange(e, 'father')}
            />

             
            <button onClick={() => handleSaveClick('father')}>Save</button>
          </>
        ) : (
          <>
            <span>{formData.father}</span>
            <button onClick={() => handleEditClick('father')}>Edit</button>
          </>
        )}
      </div>


      <div className="form-group">
        <label>Mother Maiden Name:</label>
        {editMode.M_maiden ? (
          <>
            <input
              type="text"
              name="father"
              value={formData.M_maiden}
              onChange={(e) => handleInputChange(e, 'M_maiden')}
            />

             
            <button onClick={() => handleSaveClick('M_maiden')}>Save</button>
          </>
        ) : (
          <>
            <span>{formData.M_maiden}</span>
            <button onClick={() => handleEditClick('M_maiden')}>Edit</button>
          </>
        )}
      </div>

      <div className="form-group">
        <label>Siblings:</label>
        {editMode.sibling ? (
          <>
            <input
              type="text"
              name="father"
              value={formData.sibling}
              onChange={(e) => handleInputChange(e, 'sibling')}
            />

             
            <button onClick={() => handleSaveClick('sibling')}>Save</button>
          </>
        ) : (
          <>
            <span>{formData.sibling}</span>
            <button onClick={() => handleEditClick('sibling')}>Edit</button>
          </>
        )}
      </div>

            <div className="form-group">
              <label>Father's Attainment</label>
              <span id="Father_Attainment">user input</span>
            </div>

            <div className="form-group">
              <label>Mother's Attainment</label>
              <span id="Mother_Attainment">user input</span>
            </div>
            
            <div className="form-group">
             <label>Father's Occupation</label>
              <span id="Mother_Attainment">user input</span>
            </div>
            
            <div className="form-group">
              <label>Mother's Occupation</label>
              <span id="Mother_Attainment">user input</span>
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
              <label >Skill</label>
              <span id="Skill"></span>
            </div>
            <div className="form-group">
              <label >Hobbies</label>
              <span id="Hobbies"></span>
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