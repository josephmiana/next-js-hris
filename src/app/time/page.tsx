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

	const [data, setData] = React.useState({
		username: '',
		employee_id: '',
	});

	
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [morningTimeIn, setMorningTimeIn] = useState('');
	const [morningTimeOut, setMorningTimeOut] = useState('');
	const [afternoonTimeIn, setAfternoonTimeIn] = useState('');
	const [afternoonTimeOut, setAfternoonTimeOut] = useState('');
	
	 const [totalTardiness, setTotalTardiness , ] = useState(0);	
	 const [tardinessCount, setTardinessCount] = useState(0);
	
	 const [selectedDay, setSelectedDay] = useState<string | null>(null);
	 const [overtimeIn, setOvertimeIn] = useState('');
	 const [overtimeOut, setOvertimeOut] = useState('');
	 const [isBundyClicked, setIsBundyClicked] = useState(false);
	const handleBundyClick = () => {
	  const currentTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	  const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
	  
	 
	  const isLateMorningClick = currentMinutes > 8 * 60 && currentMinutes < 12 * 60 && !morningTimeIn;
	  const dayOfWeek = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' });
	  setSelectedDay(dayOfWeek);
	  
	  if (isLateMorningClick) {
	
		const tardinessMinutes = Math.max(currentMinutes - 8 * 60, 0); 
		
		setTotalTardiness(totalTardiness + tardinessMinutes);
		setTardinessCount(tardinessCount + 1);
	
		setMorningTimeIn(currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
		
	  }
	
	  if (currentDateTime.getHours() < 12) {
		// Morning
		if (!morningTimeIn) {
		  
		} else {
		  setMorningTimeOut(currentTime);
		  if (!afternoonTimeIn) {
			const morningTimeOutDate: Date = new Date();
			morningTimeOutDate.setHours(parseInt(morningTimeOut.split(':')[0], 10));
			morningTimeOutDate.setMinutes(parseInt(morningTimeOut.split(':')[1], 10));
  
			const afternoonTimeInDate: Date = new Date();
			afternoonTimeInDate.setHours(parseInt(currentTime.split(':')[0], 10));
			afternoonTimeInDate.setMinutes(parseInt(currentTime.split(':')[1], 10));
			setOvertimeIn(afternoonTimeOut)
			

      // Update state
     
		  }
		}
	  } else {
		// Afternoon
		if (!afternoonTimeIn) {
		  setAfternoonTimeIn(currentTime);
		 
		} else {
		  setAfternoonTimeOut(currentTime);
		  setOvertimeIn(afternoonTimeOut);  // Set afternoon time out as overtime in
		  setOvertimeOut(currentTime);
	
		   
		  
		}
	  }
	};
	const calculateTotalOvertime = () => {
		if (overtimeIn && overtimeOut) {
		  const overtimeInDate = new Date();
		  overtimeInDate.setHours(parseInt(overtimeIn.split(':')[0], 10));
		  overtimeInDate.setMinutes(parseInt(overtimeIn.split(':')[1], 10));
	
		  const overtimeOutDate = new Date();
		  overtimeOutDate.setHours(parseInt(overtimeOut.split(':')[0], 10));
		  overtimeOutDate.setMinutes(parseInt(overtimeOut.split(':')[1], 10));
	
		  const timeDifferenceMillis = overtimeOutDate.getTime() - overtimeInDate.getTime();
		  const totalOvertimeMinutes = Math.max(timeDifferenceMillis / (1000 * 60), 0);
		  const totalOvertimeHours = totalOvertimeMinutes / 60;
		  return totalOvertimeHours.toFixed(2); // Format to two decimal places
		}
		return 0;
	  };
	const getUserDetails = async () => {
		const res = await axios.get('/api/users/newuser');
		setData({
			username: res.data.user.name,
			employee_id: res.data.user.employee_id,
		});
	};
	useEffect(() => {
		getUserDetails();

	}, []);

	const [loading, setLoading] = React.useState(false);
	const logout = async () => {
		try {
			await axios.get('/api/users/logout');
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
		} catch (error) {
		
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Unsuccessful Logout!',
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
			// Any cleanup code can go here
		}
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);
	
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
			<div className="Clock-container">
				<div className="clock">
					<h2>Digital Clock and Date</h2>
					<p className="digital-clock">{currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
					<p className="date">{currentDateTime.toLocaleDateString()}</p>
				</div>
				<div>
				<button type="button" className="time-in-button" onClick={handleBundyClick}>
            Bundy
          </button>
				</div>
			</div>
			<div className="title">
				<h1> CURRENT ATTENDANCE </h1>
			</div>
			<div className="position">
				<aside>
					<p className="compname">WB Majesty Marketing Corporation</p>
				</aside>
				<aside>
					
					<p>
						{' '}
						Name: <span>{data.username}</span>{' '}
					</p>

					<p>
						{' '}
						Employee ID: <span>{data.employee_id}</span>{' '}

						
					</p>
					<div className="total">
						<span className="label">Total Overtime: {calculateTotalOvertime()} hours</span>
						<span className="value"></span>
						<div className="total"></div>
						<span className="label">Total Tardiness: {tardinessCount} </span>{/*in table total*/}
						<span className="value"></span>
					</div>
				</aside>
			</div>
			<table>
				<thead>
					<tr>
						<th rowSpan={2}>Days</th>
						<th colSpan={2}>Morning</th>
						<th colSpan={2}>BreakTime</th>
						<th colSpan={2}>Afternoon</th>
						<th colSpan={2}>Overtime</th>
						<th rowSpan={2}>Tardiness</th>
						<th rowSpan={2}>Worked Hours</th>
					</tr>
					<tr>
						{/* Morning columns */}
						<th>Time In</th>
						<th>Time Out</th>

						<th>BreakTime In</th>
						<th>BreakTime Out</th>
			

						{/* Afternoon columns */}
						<th>Time In</th>
						<th>Time Out</th>

					
						{/* overtime */}
						<th>IN</th>
						<th>Out</th>

						

					</tr>
				</thead>
				<tbody>
					<tr>
					<td>{selectedDay}</td>

						<td>{morningTimeIn}</td>
                     <td>{morningTimeOut}</td>

					 <td>{morningTimeOut}</td>
					 <td>{afternoonTimeIn}</td>
					 
         
            <td>{afternoonTimeIn}</td>
            <td>{afternoonTimeOut}</td>

			<td>{overtimeIn}</td>
			<td>{overtimeOut}</td>
    

						<td> {totalTardiness} minutes	</td>
						
						<td> {} 	</td>
					
					</tr>
				</tbody>
			</table>
			<div className="btn">
				<button className="previous button" type="button">
					Previous
				</button>
				<button className="next button" type="button">
					Next
				</button>
			</div>
		</div>
	);
}