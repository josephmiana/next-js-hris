"use client";
import React, {useEffect, useRef, useState}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/coeemprequest.css';
import {
    faClipboardUser,
    faReceipt,
    faQuestionCircle,
    faAddressCard,
    faRightFromBracket,
    faEnvelope,
    faFolder,
    faClock,
    faCertificate,
    faLeftLong,
    faPersonWalkingDashedLineArrowRight
} from '@fortawesome/free-solid-svg-icons';
import {useRouter} from "next/navigation";
import Image from 'next/image';
import axios from 'axios';
import toast from "react-hot-toast"
import Swal from 'sweetalert2';

export default function Files(){

    const [uiMode, setUIMode] = useState('main'); 

    const handleSwitchUIMode = (newMode) => {
        resetDeductions();
        setSelectedMonth(''); // Reset to default (empty string)
  setSelectedPeriod('');
      setUIMode(newMode);
    };
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      validateInput();
      setIsClicked(true);
      sendData();
    };
    const router = useRouter()
    const [currentDate] = useState(new Date().toISOString().split('T')[0]);
    const[pendingFile, setPendingFile] = useState({
        name: '',
        position: '',
        requestedDate: currentDate,
        requestfile: 'coe'
    })
    const sendData = async () => {
        try {
            const response = await axios.post("/api/users/requestfiles", pendingFile);
            console.log('this is the position',pendingFile.position);
            
            Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: '201 Files change successfully created!',
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
            setPendingFile({
                name: '',
                position: '',
                requestedDate: currentDate,
                requestfile: ''
            });
        } catch (error:any) {
            console.log(error.message);
            Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: 'COE is already pending!',
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
			}).then(() => {
        window.location.href = '/coe';
      });
            
        }
    }
    const validateInput = () => {
      try {
       
        // Basic Info 
        if (!/^[a-zA-Z]*$/.test(pendingFile.name)) {
          Swal.fire({
            position: 'top-end', // Position to top-end
            icon: 'warning',
            title: 'Invalid Input for Firstname!',
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
          throw new Error('Invalid Input for for First Name');
        }} catch (error) {
     
    
          throw error; 
        }
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
    const handleInputChange = (fieldName, value) => {
        // Update editFiles
        setPendingFile(pendingFile => ({
          ...pendingFile,
          [fieldName]: value,
        }));

      };
      const resetDeductions = () => {
        setDeductions({
            tax: '',
            pagibig: '',
            philhealth:'',
            sss: '',
            totalcontribution: '',
        });
      };
      const[deductions, setDeductions] = useState({
            tax: '',
            pagibig: '',
            philhealth:'',
            sss: '',
            totalcontribution: '',
        
      })
      const [selectedMonth, setSelectedMonth] = useState('');
      const [selectedPeriod, setSelectedPeriod] = useState('');
      const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
      };
      const handlePeriodChange = (event) => {
        setSelectedPeriod(event.target.value);
      };
      const getPayslip = async () => {
        try {
          const res = await axios.get(`/api/users/document?date=${selectedMonth}&periodcovered=${selectedPeriod}`);
          setDeductions(res.data.payslip)
        } catch (error: any) {
            resetDeductions();
          console.log(error.message);
          toast.error(error.message);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        // Check if both selectedMonth and selectedPeriod have values
        if (selectedMonth && selectedPeriod) {
          getPayslip();
          console.log('this is from the useEffect', deductions);
          
        }
      }, [selectedMonth, selectedPeriod]);

        const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const periods = ['1st Period', '2nd Period'];
    const [loading, setLoading] = React.useState(false);
    const [employmentForm, setEmploymentForm] = useState({
      name: '',
      datecreated: '',
      position: '',
    });
    const getCoe = async () => {
      try {
        const res = await axios.get('/api/users/coe');
        console.log(res.data);
        
          if(res.data.success === true)
          {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Successfully fetched!',
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
          }
      } catch (error:any) {
        console.error('Error fetching COE:', error.message);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error fetching COE. Please try again.',
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
      } finally {
        // Assuming setLoading is part of your state
        setLoading(false);
      }
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
                         <span className="nav-e">
								{'Employee'}
							</span>
                        </a>
                    </li>
                    <li>
						<a href="/time">
							<FontAwesomeIcon
								icon={faClock}
								className="fas"
							/>
							<span className="nav-item">Time In</span>
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
                        <a 
                            href="/aboutme">
                                <FontAwesomeIcon icon={faAddressCard} 
                            className="fas" />
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
            {uiMode === 'main' ? (
        <div className="container">
        <button className= "mainbtn"onClick={() => handleSwitchUIMode('Coereq')}> <FontAwesomeIcon icon={faCertificate} className="fas-button" /><p>Coe Request</p></button>
          <button className= "mainbtn" onClick={() => handleSwitchUIMode('contri')}> <FontAwesomeIcon icon={faReceipt} className="fas-button" /> <p>  &nbsp;  Contribution</p></button>
       
        </div>
      ) : uiMode === 'Coereq' ? (
        // Next UI content here
        
        <div className="table-container">
        <div className="outer">
            <div className="tables">
                <table>
                    <thead>
                        <tr>
                            <th>INFORMATION</th>
                            <th className="requested">REQUESTED</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row1">
                            <td>Employee Name</td>
                            <td><input
                          type="text"
                           name="employeeNo"
                         id="employeeNo"
                          value={pendingFile.name}
                           onChange={(e) => {
                          const inputValue = e.target.value;

                          if (/^[a-zA-Z\s]+$/.test(inputValue) || inputValue === "") {
    
                           handleInputChange('name', inputValue);
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
                        <tr className="row2">
                            <td>Date of Request</td>
                            <td><input type="date" id="dateInputRow2" className="date-input" value={currentDate} readOnly/></td>
                       
                        </tr>
                        <tr className="row3">
                            <td> Position</td>
                            <td><input
  type="text"
  value={pendingFile.position}
  onChange={(e) => {
    const inputValue = e.target.value;

    
    if (/^[a-zA-Z\s]+$/.test(inputValue) || inputValue === "") {
      // Handle the valid input, for example, update the state
      handleInputChange('position', inputValue);
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
                    <div className="new-btn">
    {isClicked ? (
      <button className="btn-pending">
        <FontAwesomeIcon icon={faEnvelope} className="fass" /> Pending Request CoE
      </button>
    ) : (
      <button className="btn-save" onClick={handleClick}>
        <FontAwesomeIcon icon={faEnvelope} className="fass" /> submit
      </button>
      
    )
    }
   
       
            </div>
            <div className="btn-coe-container">
              <div className="gobackbtn">
                      <button onClick={() => handleSwitchUIMode('main')} className=''> <FontAwesomeIcon icon={faLeftLong} className="fass" /><span>Go Back</span></button>
                      </div>
                      <div className="coefilebtn">
                         <a >  <button className="coefile" onClick={getCoe} >
        <FontAwesomeIcon icon={faEnvelope} className="fass" /> Coe File
      </button></a>
      </div>
      </div>
      
</div>
          
              
         
   
     
        <div className="new-btn">
    {isClicked ? (
      <button className="btn-pending">
        <FontAwesomeIcon icon={faEnvelope} className="fass" /> Pending Request CoE
      </button>
    ) : (
      <button className="btn-save" onClick={handleClick}>
        <FontAwesomeIcon icon={faEnvelope} className="fass" /> submit
      </button>
      
    )
    }
   
       
            </div>
    </div>
                </div>
        
      ) :  uiMode === 'contri' ? (
        <div className="container-nextui">
                  <h1>CONTRIBUTION</h1>
        
    
        <div id="content">
        <div className="attendance-ui">
      
           

                <table>
            <thead>
                            <tr>
                                <th>SSS</th>
                                <th>PhilHealth</th>
                                <th>PagIbig</th>
                             
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                          
				<td>{deductions.sss}</td>
				<td>{deductions.philhealth}</td>
				<td>{deductions.pagibig}</td>
			</tr>
      </tbody>
                        </table>
          </div>
          </div>
          <div className="Selection-Container">
          <div className="MonthSelection">
                <label htmlFor="monthSelect">Select a Month:</label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="" disabled>Select Option</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                </div>
                <div  className="PeriodSelection" >
                <label htmlFor="periodSelect">Select a Period:</label>
                <select id="periodSelect" value={selectedPeriod} onChange={handlePeriodChange}>
                  <option value="" disabled>Select Option</option>
                  {periods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
                </div>
                </div>
          <button onClick={() => handleSwitchUIMode('main')}> <FontAwesomeIcon icon={faLeftLong} className="back" /><p>Go Back</p></button>
   
        
        </div>
              ) : null}
              </div>
  
         
    );
};

