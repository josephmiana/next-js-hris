"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/files.css';
import {
    faClipboardUser,
    faReceipt,
    faQuestionCircle,
    faAddressCard,
    faRightFromBracket,
    faEnvelope,
    faCancel,
    faClock,
    faFolder
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import axios from 'axios';
import toast from "react-hot-toast"
import Swal from 'sweetalert2';


export default function Files() {
    const router = useRouter()
    const [files, setFiles] = useState({
        name: '',
        employee_id: '',
        hireddate: '',
        pagibig: '',
        philhealth: '',
        tin: '',
        sss: ''
    })
    const [editFiles, setEditFiles] = useState({
        employee_id: '',
        hireddate: '',
        pagibig: '',
        philhealth: '',
        tin: '',
        sss: '',
    });
    const [pendingFiles, setPendingFiles] = useState({
        employee_id: '',
        hireddate: '',
        pagibig: '',
        philhealth: '',
        tin: '',
        sss: '',
        requestfile: '201File',
    });
    const handleInputChange = (fieldName, value) => {
        // Update editFiles
        setEditFiles(prevEditFiles => ({
          ...prevEditFiles,
          [fieldName]: value,
        }));
    
        // Update pendingFiles
        setPendingFiles(prevPendingFiles => ({
          ...prevPendingFiles,
          [fieldName]: value,
        }));
      };
    const print = () => {
        console.log('edit files', editFiles);
        console.log('pending', pendingFiles);
    }
    const sendData = async () => {
        try {
            const response = await axios.post("/api/users/requestfiles", pendingFiles);
            setPendingFiles({
                employee_id: '',
                hireddate: '',
                pagibig: '',
                philhealth: '',
                tin: '',
                sss: '',
                requestfile: '',
              });
              setEditFiles({
                employee_id: '',
                hireddate: '',
                pagibig: '',
                philhealth: '',
                tin: '',
                sss: '',
              });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '201 Files change successfully created!',
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
                // Code to execute after Swal modal is closed
                
                window.location.reload();
              });
        } catch (error:any) {
            Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: '201 File Change is already pending!',
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
            console.log(error.message);
            
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/users/201files');
            setFiles(response.data.userData[0]);
            setEditFiles({ ...editFiles, employee_id: response.data.userData[0].employee_id})
            setPendingFiles({ ...pendingFiles, employee_id: response.data.userData[0].employee_id})
        } catch (error: any) {
            console.error('Error fetching data:', error.message);
        }
    }
    useEffect(() => {
		fetchData(); 
	}, []);

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
                            <span className="nav-e">Employee</span>
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
            <div className="table-container">
                <div className="outer">
                    <div className="tables">
                        <table>
                            <thead>
                                <tr>
                                    <th>INFORMATION</th>
                                    <th className="requested">REQUESTED</th>
                                    <th className="current">CURRENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="row1">
                                    <td>Employee No.</td>
                                    <td><input type="text" name="employeeNo" id="employeeNo" value={files.employee_id} readOnly /></td>
                                    <td>{files.employee_id || 'Not Submitted'}</td>
                                </tr>
                                <tr className="row2">
                                    <td>Hired Date</td>
                                    <td><input type="date" id="dateInputRow2" className="date-input" value={editFiles.hireddate} onChange={(e) => handleInputChange('hireddate', e.target.value)}
                                     /></td>
                                    <td>{files.hireddate || 'Not Submitted'}</td>
                                </tr>
                                <tr className="row3">
                                    <td>Pag-Ibig No.</td>
                                    <td><input type="number" value={editFiles.pagibig} onChange={(e) => handleInputChange('pagibig', e.target.value)}/></td>
                                    
                                    <td>{files.pagibig || 'Not Submitted'}</td>
                                </tr>
                                <tr className="row4">
                                    <td>Philhealth</td>
                                    <td><input type="number" value={editFiles.philhealth} onChange={(e) => handleInputChange('philhealth', e.target.value)}/></td>
                                    <td>{files.philhealth || 'Not Submitted'}</td>
                                </tr>
                                <tr className="row5">
                                    <td>Tin No</td>
                                    <td><input type="number" value={editFiles.tin}  onChange={(e) => handleInputChange('tin', e.target.value)}/></td>
                                    <td>{files.tin || 'Not Submitted'}</td>
                                </tr>
                                <tr className="row6">
                                    <td>SSS No.</td>
                                    <td><input type="number" value={editFiles.sss} onChange={(e) => handleInputChange('sss', e.target.value)}/></td>
                                    <td>{files.sss || 'Not Submitted'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="new-btn">
                        <button className="btn-save" onClick={sendData}> <FontAwesomeIcon icon={faEnvelope} className="fass" />Save & Submit </button>
                        <button className="btn-cancel" onClick={print}><FontAwesomeIcon icon={faCancel} className="fass"/>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

