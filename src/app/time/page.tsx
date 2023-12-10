'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/time.css';
import {
	faClipboardUser,
	faReceipt,
	faQuestionCircle,
	faAddressCard,
	faRightFromBracket,
    faClock,
	faFolder
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Time() {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
  
	useEffect(() => {
	  const intervalId = setInterval(() => {
		setCurrentDateTime(new Date());
	  }, 1000);
  
	  return () => clearInterval(intervalId);
	}, []);
  
	const handleTimeInClick = () => {

		try{
			onLogInandOut();
			Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'success',
				title: 'Clocked Successfully!',
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
		}catch(error: any){
			console.log(error.message);
			
			Swal.fire({
				position: 'top-end', // Position to top-end
				icon: 'error',
				title: 'Clocked Unsuccessfully!',
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
		const [loading, setLoading] = React.useState(false);
	};
  
	const formattedTime = currentDateTime.toLocaleTimeString([], {
	  hour: '2-digit',
	  minute: '2-digit',
	 
	});
	
	const onLogInandOut = () => {
		setBundy({ ...bundy, time: formattedTime });
	  };
	const [bundy, setBundy] = React.useState({
		time: '',
	  });
	  useEffect(() => {
		const postData = async () => {
		  try {
			
			const response = await axios.post("/api/users/bundyclock", bundy);
			console.log("Recorded!", response.data);
			toast.success("Record Success!")
		  } catch (error: any) {
			toast.error(error.message);
		  }
		};
	
		if (bundy.time !== "") {
		  postData();
		}
	  }, [bundy.time]);
	return (
		
		<div>

			<div className="Sidebar">
				<header className="head"></header>

				<ul>
					<li>
						<a
							href="#"
							className="logo"
						>
							<Image
								src="/images/logo.png"
								width={50}
								height={50}
								alt="Picture of the author"
							/>
							<span className="nav-e">
							
							</span>
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
							<FontAwesomeIcon
								icon={faClipboardUser}
								className="fas"
							/>
							<span className="nav-item">Attendance</span>
						</a>
					</li>

					<li>
						<a href="/payslip">
							<FontAwesomeIcon
								icon={faReceipt}
								className="fas"
							/>
							<span className="nav-item">Payslip</span>
						</a>
					</li>

					<li>
						<a href="/201files">
							<FontAwesomeIcon
								icon={faQuestionCircle}
								className="fas"
							/>
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
							<FontAwesomeIcon
								icon={faAddressCard}
								className="fas"
							/>
							<span className="nav-item">About Me</span>
						</a>
					</li>

					<li>
						<a
							href="/login"
							className="logout"
							onClick={(e) => {
								e.preventDefault();
								
							}}	
						>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								className="fas"
							/>
							<span className="nav-item">Log-Out</span>
						</a>
					</li>
				</ul>
			</div>
			<div className="Clock-container">
        <div className="clock">
          <h2>Digital Clock and Date</h2>
          <p className="digital-clock">
            {formattedTime}
          </p>
          <p>
             {currentDateTime.toLocaleDateString()}
          </p>
        </div>

    <div>
          <button type="button" onClick={handleTimeInClick} className="time-in-button">
            Bundy
          </button>
		  </div>

     </div>
      </div>
    
  );
}