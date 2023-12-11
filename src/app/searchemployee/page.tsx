"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import "src/app/adminstyles/searchem.css";
import {
  faChartLine,
  faUserPlus,
  faFile,
  faRightFromBracket,
  faUser,
  faHouse,
  faUserGroup,
  faGraduationCap,
  faMedkit,
  faBicycle,
  faSearch,
  faHistory,
  faReceipt,
  faFileEdit,
  faLeftLong,
  faCircle, // Changed from faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { log } from "console";
import Swal from "sweetalert2";
export default function About() {

  const [activeNavItem, setActiveNavItem] = useState(0);

  const navItems = [
    "Basic Information",
    "Address Information",
    "Family Background",
    "Educational Background",
    "Medical Information",
    "Skills & Hobbies",
  ];

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
  
  const [formData, setFormData] = useState({
    //basic info
    fName:"",
    status: "",
    religion: "",
    birthplace: "",
    Phone: "",
    gender: "",
    //address info
    blk: "",
    street: "",
    barangay: "",
    city: "",
    region: "",
    zipcode: "",
    //fam back
    father: "",
    M_maiden: "",
    sibling: "",
    F_Attainment: "",
    M_Attainment: "",
    M_Occupation: "",
    F_Occupation: "",
    //school
    tertiary: "",
    secondary: "",
    primary: "",
    //med his
    height: "",
    weight: "",
    blood: "",
    med_his: "",
    //skill
    skill: "",
    hobbies: "",
  });
  const [userData, setuserData] = useState<InformationType[]>([]);
  type InformationType = {
    _id: string;
    name: string;
    email: string;
    employee_id: string;
    isVerified: boolean;
  };
  type ProductRowProps = {
		attendanceItem: InformationType;
		key: React.Key;
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
  const getAttendanceData = async () => {
		try {
			const res = await axios.get('/api/users/searchemployee'); // Replace with your actual endpoint
			setuserData(res.data.user); // Assuming the response contains an array of attendance data

		} catch (error: any) {
			console.error(error.message);
			// Handle error
		}
	};
  useEffect(() => {
		getAttendanceData(); // Fetch attendance data when the component mounts
	}, []);
  function AttendanceRow({ attendanceItem }: ProductRowProps) {
		return (
			<tr>
				<td>{attendanceItem.name}</td>
				<td>{attendanceItem.employee_id}</td>
				<td>{attendanceItem.email}</td>
        <td>
          <FontAwesomeIcon
            icon={faCircle}
            className="fas-status"
            style={{ color: getStatusColor(attendanceItem.isVerified) }}
          />
        </td>
        <td>
          <button className="i" onClick={() => setSelect(attendanceItem.employee_id)}>
          <FontAwesomeIcon icon={faFileEdit} className="fass" />
          </button>
        </td>
			</tr>
		);
	}
  async function setSelect(selected: React.SetStateAction<string>)
  {
    setSelectUser(selected)
    getUserDetails(selected);
    setUIMode("next")
  }
  const [editMode, setEditMode] = useState({

    basicinfo: false,
    AddressInfo:false,
    fambackground:false,
    educbackground:false,
    medBackground:false,
    skillhobby:false,
  });
  function getIconForNavItem(index) {
    const icons = [
      faUser,
      faHouse,
      faUserGroup,
      faGraduationCap,
      faMedkit,
      faBicycle,
    ];
    return icons[index];
  }
  const handleEditClick = (fieldName) => {
    setEditMode({
      ...editMode,
      [fieldName]: true,
    });
  };
  const updateData = async () => {
    try {
      await axios.post('/api/users/aboutme', information);
      Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: 'Updated Successfully!',
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
    } catch (error:any) {
      console.error('Error pushing data:', error.message);
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
  const handleSaveClick = (fieldName) => {
    setEditMode({
      ...editMode,
      [fieldName]: false,
    });
    updateData();
  };
  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

 
 const [information, setInformation] = useState({
  _id: ' ',
  employee_id: ' ',
  basic:{
    fullname: ' ',
    religion: ' ',
    birthplace: ' ',
    status: ' ',
    gender: ' ',
    phone: ' ',
  },
  address:{
    blk: ' ',
    street: ' ',
    barangay: ' ',
    city: ' ',
    region: ' ',
    zipcode: ' ',
  },
  familybg:{
    father_name: ' ',
    mother_name: ' ',
    sibling: ' ',
    father_attainment: ' ',
    mother_attainment: ' ',
    father_occupation: ' ',
    mother_occupation: ' ',
  },
  educationalbg:{
    tertiary: ' ',
    secondary: ' ',
    primary: ' ',
  },
  medical:{
    height: ' ',
    weight: ' ',
    bloodtype: ' ',
    medicalhistory: ' ',
  },
  skillandhobby:{
    skill: ' ',
    hobby: ' ',
  },
});
const getUserDetails = async (selected: React.SetStateAction<string>) => {
  try {
    const response = await axios.get(
      `/api/users/adminemployee?employee_id=${selected}`
    );
    setInformation(response.data.user[0])
    console.log(information);
    
  } catch (error: any) {
    console.error(error.message);
    // Handle error
  }
};
const initialInformationState = () => ({
  _id: '',
  employee_id: '',
  basic: {
    fullname: '',
    religion: '',
    birthplace: '',
    status: '',
    gender: '',
    phone: '',
  },
  address: {
    blk: '',
    street: '',
    barangay: '',
    city: '',
    region: '',
    zipcode: '',
  },
  familybg: {
    father_name: '',
    mother_name: '',
    sibling: '',
    father_attainment: '',
    mother_attainment: '',
    father_occupation: '',
    mother_occupation: '',
  },
  educationalbg: {
    tertiary: '',
    secondary: '',
    primary: '',
  },
  medical: {
    height: '',
    weight: '',
    bloodtype: '',
    medicalhistory: '',
  },
  skillandhobby: {
    skill: '',
    hobby: '',
  },
});
const [uiMode, setUIMode] = useState("main"); // 'main' or 'next'
  const handleSwitchUINext = () => {
    setUIMode("main");
    console.log('this is next');
    setSelectUser('');
    setInformation(initialInformationState);
  }
    const[selectUser, setSelectUser] = useState('');
  function renderContentForNavItem(index) {
    switch (index) {
      case 0:
        return (
          <div className="conten-active">
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
                  value={information.basic.fullname}
                  onChange={(e) => setInformation((information) => ({ ...information, basic: { ...information.basic, fullname: e.target.value } }))}
                />
              </>
            ) : (
              <>
                <span>{information.basic.fullname || " "}</span>
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
                  name="religion"
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
                        type="number"
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
     
        {editMode.basicinfo? (
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
        {editMode.AddressInfo? (
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
        {editMode.AddressInfo? (
          <>
            <input
                        type="text"
                        name="Region"
                        onChange={(e) => setInformation((information) => ({ ...information, address: { ...information.address, city: e.target.value } }))}
                        
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
        {editMode.AddressInfo? (
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
     
     {editMode.AddressInfo? (
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
        {editMode.fambackground  ? (
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
        <label>Siblings:</label>
        {editMode.fambackground ? (
          <>
            <input
                        type="text"
                        name="father"
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
        <label>Fathers Attainment:</label>
        {editMode.fambackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.familybg.father_attainment}
              onChange={(e) => setInformation((information) => ({ ...information, familybg: { ...information.familybg, father_attainment: e.target.value } }))}            />

             
           
          </>
        ) : (
          <>
            <span>{information.familybg.father_attainment}</span>
        
          </>
        )}
      </div>
      <div className="form-group">
        <label>{`Mother's Attainment`}</label>
        {editMode.fambackground ? (
          <>
            <input
              type="text"
              name="father"
              value={formData.M_Attainment}
              onChange={(e) => handleInputChange(e, 'M_Attainment')}
            />

             
           
          </>
        ) : (
          <>
          <span>{formData.M_Attainment}</span>

          </>
        )}
      </div>
      <div className="form-group">
        <label>Fathers Occupation:</label>
        {editMode.fambackground ? (
          <>
            <input
              type="text"
              name="father"
              value={formData.F_Occupation}
              onChange={(e) => handleInputChange(e, 'F_Occupation')}
            />

             
           
          </>
        ) : (
          <>
            <span>{formData.F_Occupation}</span>
        
          </>
        )}
      </div>
            
      <div className="form-group">
        <label>Fathers Occupation:</label>
        {editMode.fambackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.familybg.father_occupation}
              onChange={(e) => setInformation((information) => ({ ...information, familybg: { ...information.familybg, father_occupation: e.target.value } }))}   
            />

             
           
          </>
        ) : (
          <>
            <span>{information.familybg.father_occupation}</span>
        
          </>
        )}
      </div>
            <div className="btn my-custom-btn">
     
     {editMode.fambackground? (
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
        <label>Tertiary:</label>
        {editMode.educbackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.educationalbg.tertiary}
              onChange={(e) => setInformation((information) => ({ ...information, educationalbg: { ...information.educationalbg, tertiary: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.educationalbg.tertiary}</span>
        
          </>
        )}
      </div>

         
      <div className="form-group">
        <label>Secondary:</label>
        {editMode.educbackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.educationalbg.secondary}
              onChange={(e) => setInformation((information) => ({ ...information, educationalbg: { ...information.educationalbg, secondary: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.educationalbg.secondary}</span>
        
          </>
        )}
      </div>

      <div className="form-group">
        <label>Primary:</label>
        {editMode.educbackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.educationalbg.primary}
              onChange={(e) => setInformation((information) => ({ ...information, educationalbg: { ...information.educationalbg, primary: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.educationalbg.primary}</span>
        
          </>
        )}
      </div>
            <div className="btn my-custom-btn">
     
     {editMode.educbackground? (
       <>
     
   

          
         <button onClick={() => handleSaveClick('educbackground')}>Save</button>
       </>
     ) : (
       <>
       
         <button onClick={() => handleEditClick('educbackground')}>Edit</button>
       </>
     )}
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
        <label>Height:</label>
        {editMode.medBackground ? (
          <>
            <input
              type="text"
              name="height"
              value={information.medical.height}
              onChange={(e) => setInformation((information) => ({ ...information, medical: { ...information.medical, height: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.medical.height}</span>
        
          </>
        )}
      </div>

      <div className="form-group">
        <label>Weight:</label>
        {editMode.medBackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.medical.weight}
              onChange={(e) => setInformation((information) => ({ ...information, medical: { ...information.medical, weight: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.medical.weight}</span>
        
          </>
        )}
      </div>

      <div className="form-group">
        <label>Blood:</label>
        {editMode.medBackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.medical.bloodtype}
              onChange={(e) => setInformation((information) => ({ ...information, medical: { ...information.medical, bloodtype: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.medical.bloodtype}</span>
        
          </>
        )}
      </div>
      <div className="form-group">
        <label>Medical History:</label>
        {editMode.medBackground ? (
          <>
            <input
              type="text"
              name="father"
              value={information.medical.medicalhistory}
              onChange={(e) => setInformation((information) => ({ ...information, medical: { ...information.medical, medicalhistory: e.target.value } }))}
            />

             
           
          </>
        ) : (
          <>
            <span>{information.medical.medicalhistory}</span>
        
          </>
        )}
      </div>
            <div className="btn my-custom-btn">
     
     {editMode.medBackground? (
       <>
     
   

          
         <button onClick={() => handleSaveClick('medBackground')}>Save</button>
       </>
     ) : (
       <>
       
         <button onClick={() => handleEditClick('medBackground')}>Edit</button>
       </>
     )}
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
              value={information.skillandhobby.skill}
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
        {editMode.skillhobby? (
          <>
            <input
              type="text"
              name="hobby"
              value={information.skillandhobby.hobby}
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
     
     {editMode.skillhobby? (
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

  const getStatusColor = (status) =>
    status === false ? "red" : "#69DF06";
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
      {uiMode === "main" ? (
        <div className="container">
          <h1>Account Status</h1>
          <table id="clickable-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID{selectUser}</th>
                <th>Email</th>
                <th>Status</th>

                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
							{userData.map((attendanceItem) => (
								<AttendanceRow
									key={attendanceItem._id}
									attendanceItem={attendanceItem}

								/>
							))}
						</tbody>
            <div className="btn-prev">
    <button className="previouss" type="button">
      Previous
    </button>
    <button className="next" type="button">
      Next
    </button>
    </div>
          </table>
        </div>
      ) : (
        <div>
          <div className="box1">
            <p>Employee Information</p>
          </div>
          <div className="box2">
            <ul style={{ listStyle: "none" }}>
              <p>Employee Information </p>
              {navItems.map((item, index) => (
                <li key={index}>
                  <a onClick={() => handleNavItemClick(index)}>
                    <FontAwesomeIcon
                      icon={getIconForNavItem(index)}
                      className="fas"
                    />
                    <span
                      className={`nav-item ${
                        index === activeNavItem ? "active" : ""
                      }`}
                    >
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="box3">
            {renderContentForNavItem(activeNavItem)}
            <div className="search-form">
              <form>
                <input type="text" id="search-input" />

                <button type="button" onClick={() => {}}>
                  Search
                </button>
                <div className="archive-btn">
   <button type="button" className="archive" onClick={() => {}}>
                 Archive
                </button>
   </div>
              </form>
            </div>
            <div className="previous">
              <button onClick={handleSwitchUINext}>
                {" "}
                <FontAwesomeIcon icon={faLeftLong} className="fas-back" />
                <p>Previous</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
