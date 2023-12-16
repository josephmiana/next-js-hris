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
	//button checker
	const [timeInEnabled, setTimeInEnabled] = useState(true);
    const [timeOutEnabled, setTimeOutEnabled] = useState(false);

	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [morningTimeIn, setMorningTimeIn] = useState('');
	const [morningTimeOut, setMorningTimeOut] = useState('');
	const [afternoonTimeIn, setAfternoonTimeIn] = useState('');
	const [afternoonTimeOut, setAfternoonTimeOut] = useState('');
	const [timeStamp, setTimeStamp] = useState ({
		currentDate: currentDateTime.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }),
		morningTimeIn: '',
		morningTimeOut: '',
		afternoonTimeIn: '',
		afternoonTimeOut: '',
		breaktimeIn: '',
		breaktimeOut: '',
		overTimeIn: '',
		overTimeOut: '',
		tardiness: '',
		workedHours: '',
	});
	const [totalTardiness, setTotalTardiness,] = useState(0);
	const [tardinessCount, setTardinessCount] = useState(0);
	
	const [overtimeIn, setOvertimeIn] = useState('');
	const [overtimeOut, setOvertimeOut] = useState('');

	//2 buttons function
	const handleTimeIn = () => {
		console.log(currentDateTime);
		
		const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
		const isLateMorningClick =currentMinutes > 8 * 60 && currentMinutes < 12 * 60 && !timeStamp.morningTimeIn;
		const isAfternoon =  currentMinutes > 13 * 60 && currentMinutes < 17 * 60 && !timeStamp.afternoonTimeIn;

		const tardinessMinutes = Math.max(currentMinutes - 8 * 60, 0);
		const tardinessHours = Math.floor(tardinessMinutes / 60);
		if (isLateMorningClick) {
			//tardiness
			
			setTimeStamp(({ ...timeStamp, tardiness: tardinessHours.toString() }));
			//time in
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, morningTimeIn: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Successfully Timed In!',
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
		else if (isAfternoon){
			setTimeStamp(({ ...timeStamp, tardiness: tardinessHours.toString() }));
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, afternoonTimeIn: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Successfully Timed In!',
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
		else{
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Unsuccessful Time In!',
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
			setTimeInEnabled(false);
        	setTimeOutEnabled(true);
	}

	useEffect(() => {
		if (timeStamp.morningTimeIn && timeStamp.afternoonTimeIn && timeStamp.morningTimeOut) {
			setTimeStamp((timeStamp) => ({ ...timeStamp, breaktimeOut: timeStamp.afternoonTimeIn }));
		}
	}, [timeStamp.morningTimeIn, timeStamp.afternoonTimeIn, timeStamp.morningTimeOut]);

	const handleTimeOut = () => {
		const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
		const isLateMorningClick =currentMinutes > 8 * 60 && currentMinutes < 12 * 60 && timeStamp.morningTimeIn && !timeStamp.morningTimeOut;
		const isAfternoon =  currentMinutes > 13 * 60 && currentMinutes < 17 * 60 && timeStamp.afternoonTimeIn && !timeStamp.afternoonTimeOut;
		const isOvertimed = currentMinutes > 13 * 60 && currentMinutes < 22 * 60 && timeStamp.afternoonTimeIn && !timeStamp.afternoonTimeOut;
		const tardinessMinutes = Math.max(currentMinutes - 8 * 60, 0);
		const tardinessHours = Math.floor(tardinessMinutes / 60);
		if (isLateMorningClick) {
			//tardiness
			
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, morningTimeOut: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Successfully Timed Out!',
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
		else if (isAfternoon){
			setTimeStamp(({ ...timeStamp, tardiness: tardinessHours.toString() }));
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, afternoonTimeOut: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Successfully Timed Out!',
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
		
		else if (!isAfternoon && !timeStamp.afternoonTimeOut){
			setTimeStamp(({ ...timeStamp, tardiness: tardinessHours.toString() }));
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, afternoonTimeOut: '6:00 PM' }));
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, overTimeIn: '06:00 PM' }));
			setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, overTimeOut: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));

			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: 'Successfully Timed Out!',
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
		else{
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Unsuccessful Time Out!',
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
			setTimeInEnabled(true);
        	setTimeOutEnabled(false);
	}
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
					<button type="button" className="time-in-button" onClick={handleTimeIn} disabled={!timeInEnabled}>
						Time In
					</button>
					<button type="button" className="time-in-button" onClick={handleTimeOut} disabled={!timeOutEnabled}>
						Time Out
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
						<th rowSpan={2}>Date</th>
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
						<td>{timeStamp.currentDate}</td>
						<td>{timeStamp.morningTimeIn}</td>
						<td>{timeStamp.morningTimeOut}</td>
						<td>{timeStamp.breaktimeIn}</td>
						<td>{timeStamp.breaktimeOut}</td>
						<td>{timeStamp.afternoonTimeIn}</td>
						<td>{timeStamp.afternoonTimeOut}</td>
						<td>{timeStamp.overTimeIn}</td>
						<td>{timeStamp.overTimeOut}</td>
						<td> {timeStamp.tardiness} hour/s</td>
						<td> { } 	</td>

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