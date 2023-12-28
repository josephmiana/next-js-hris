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
import { time } from 'console';

export default function Time() {

	const [data, setData] = React.useState({
		username: '',
		employee_id: '',
	});
	//button checker
	const [timeInEnabled, setTimeInEnabled] = useState(true);
	const [timeOutEnabled, setTimeOutEnabled] = useState(false);
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	type ProductType = {
		_id: string;
		name: string;
		employee_id: string;
		morningTimeIn: string;
		morningTimeOut: string;
		afternoonTimeIn: string;
		afternoonTimeOut: string;
		breaktimeIn: string;
		breaktimeOut: string;
		overTimeIn: string;
		overTimeOut: string;
		overtime: string;
		normalhour: string;
		tardiness: string;
		workedHours: string;
		date: string;
	  };
	  

	type ProductRowProps = {
		attendanceItem: ProductType;
		key: React.Key; // You can use 'React.Key' for the type of 'key'
	};

	function AttendanceRow({ attendanceItem }: ProductRowProps) {
		return (
			<tr>
					<td>{attendanceItem.date ? (new Date(attendanceItem.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })) : ("   ")}</td>						
					<td>{attendanceItem.morningTimeIn}</td>
						<td>{attendanceItem.morningTimeOut}</td>
						<td>{attendanceItem.breaktimeIn}</td>
						<td>{attendanceItem.breaktimeOut}</td>
						<td>{attendanceItem.afternoonTimeIn}</td>
						<td>{attendanceItem.afternoonTimeOut}</td>
						<td>{attendanceItem.overTimeIn}</td>
						<td>{attendanceItem.overTimeOut}</td>
						<td> {isNaN(parseFloat(attendanceItem.tardiness)) ? 0 : attendanceItem.tardiness} minute/s</td>
						<td>{isNaN(parseFloat(attendanceItem.workedHours)) ? 0 : attendanceItem.workedHours} hour/s</td>


					</tr>
		);
	}

	const [attendanceData, setAttendanceData] = useState<ProductType[]>([]);
	const getAttendanceData = async () => {
		try {
			const res = await axios.get('/api/users/load'); // Replace with your actual endpoint
			setAttendanceData(res.data.map); // Assuming the response contains an array of attendance data

			console.log('this is the', res);
			
		} catch (error: any) {
			console.error(error.message);
			// Handle error
		}
	};
	
	const [timeStamp, setTimeStamp] = useState({
		date: '', 
		morningTimeIn: '',
		morningTimeOut: '',
		afternoonTimeIn: '',
		afternoonTimeOut: '',
		breaktimeIn: '',
		breaktimeOut: '',
		overTimeIn: '',
		overTimeOut: '',
		overtime: '',
		normalhour: '',
		tardiness: '',
		workedHours: '',
	});
	const [schedule, setSchedule] = useState({
		startshiftperweek: '',
		endshiftperweek: '',
		startshift: '',
		endshift: '',
	})
	//Function for printing
	const printtry = () => {
		const convertToTotalMinutes = (timeString) => {
			const [rawTime, period] = timeString.split(' ');
			const [hours, minutes] = rawTime.split(':').map(Number);
			const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
			return adjustedHours * 60 + minutes;
		  };
	  
		  const totalMinutesMorning = convertToTotalMinutes(timeStamp.morningTimeIn) || 0;
		  const scheduleTimeInMorning = (parseFloat('07:00 AM') * 60) || 0; // Changed to 7:00 AM
		
		  const totalMinutesAfternoon = convertToTotalMinutes(timeStamp.afternoonTimeIn) || 0;
		  const totalMinutesAfternoonRequired = convertToTotalMinutes('01:00 PM') || 0;
		  const totalAfternoon = totalMinutesAfternoon - totalMinutesAfternoonRequired || 0; 
		  const totalMorning = totalMinutesMorning - scheduleTimeInMorning || 0
		  let totalLate;
		  console.log(totalMinutesAfternoon + ' - ' + totalMinutesAfternoonRequired + ' = ' + (totalMinutesAfternoon-totalMinutesAfternoonRequired));

		  
		  
		  if (!timeStamp.morningTimeIn && !timeStamp.morningTimeOut) {
			// No morning time in and out, calculate afternoon tardiness
			const total = totalAfternoon >= 10 ? totalAfternoon: 0;
			setTimeStamp({ ...timeStamp, tardiness: String(total)});
		  } else {
			// Morning time in and out available, calculate overall tardiness
			const afternoon = totalAfternoon > 10 ? totalAfternoon : 0;
			const morning = totalMorning > 10 ? totalMorning : 0;
			totalLate = Math.max(afternoon, 0) + Math.max(morning, 0);
			if (totalMinutesMorning > scheduleTimeInMorning + 10) {
			  // If morning time in is more than 10 minutes beyond the required time, consider grace period
			  console.log('the total minutes is greater than 7:10');
			  setTimeStamp({ ...timeStamp, tardiness: String(totalLate) });
			  console.log(timeStamp.tardiness);
			} else {
			  console.log('the total minutes is less than 7:10');
			  setTimeStamp({ ...timeStamp, tardiness: String(totalLate) });
			}
		  }
		};

	//USE EFFECT FOR TARDINESS
	useEffect(() => 
	{
		printtry();
	}, [timeStamp.morningTimeIn, timeStamp.afternoonTimeIn])
	
	const sendData = async () => {
		try {
			await axios.post('/api/users/bundyclock', timeStamp)

		} catch (error: any) {
			console.log(error.message);
		}
	}
	useEffect(() => 
	{
		sendData();
	}, [timeStamp])

	useEffect(() => 
	{
		if(timeStamp.morningTimeOut && timeStamp.afternoonTimeIn)
		{
			setTimeStamp({...timeStamp, breaktimeIn: timeStamp.morningTimeOut, breaktimeOut: timeStamp.afternoonTimeIn})
		}
	},[timeStamp.afternoonTimeIn])
	const handleTimeIn = async () => {

		const current = currentDateTime.getDay();
		const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
		const isLateMorningClick = currentMinutes > parseFloat(schedule.startshift) * 60 && currentMinutes < 12 * 60 && !timeStamp.morningTimeIn;
		const isAfternoon = currentMinutes > 13 * 60 && currentMinutes < parseFloat(schedule.endshift) * 60 && !timeStamp.afternoonTimeIn;

		if (current >= parseFloat(schedule.startshiftperweek) && current <= parseFloat(schedule.endshiftperweek)) {
			if (isLateMorningClick) {
				//time in
				setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, morningTimeIn: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
				setTimeInEnabled(false);
				setTimeOutEnabled(true);
				
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Successfully Timed In Morning!',
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
			else if (isAfternoon) {
				setTimeStamp((prevTimeStamp) => ({ ...prevTimeStamp, afternoonTimeIn: currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) }));
				setTimeInEnabled(false);
				setTimeOutEnabled(true);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Successfully Timed In Afternoon!',
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
				  })
				  
			}
			else {
				setTimeInEnabled(true);
				setTimeOutEnabled(false);
				Swal.fire({
					position: 'top-end',
					icon: 'error',
					title: 'Unsuccessful Time In here!',
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
		} else {
			Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: `You don't have work right now!`,
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


	}
		const setWorkedHours = async () => {
			try { 
				const convertToMinutes = (timeString) => {
					const [rawTime, period] = timeString.split(' ');
					const [hours, minutes] = rawTime.split(':').map(Number);
					const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
					return adjustedHours * 60 + minutes;
				};
		
			let afternoonIn = Math.round((convertToMinutes(timeStamp.afternoonTimeIn) + 720) * 2) / 2; // 720 minutes = 12 hours
			let afternoonOut = (convertToMinutes(timeStamp.afternoonTimeOut) + 720) || 0;
			let overtimeIn = (convertToMinutes(timeStamp.overTimeIn) + 720) || 0;
			let overtimeOut = (convertToMinutes(timeStamp.overTimeOut) + 720) || 0;
			let morningHours = (convertToMinutes(timeStamp.morningTimeOut) - convertToMinutes(timeStamp.morningTimeIn)) / 60 || 0;
			let afternoonHours = (afternoonOut - afternoonIn) / 60 || 0;
			const normalHours = morningHours + afternoonHours || 0;
			const overtimeHours = (overtimeOut - overtimeIn) / 60 || 0;
			const workedHours = afternoonHours + morningHours + overtimeHours || 0;
			
			setTimeStamp({
				...timeStamp,
				normalhour: String(Math.ceil(normalHours * 2) / 2),
				workedHours: String(Math.ceil(workedHours * 2) / 2),
				overtime: String(Math.ceil(overtimeHours * 2) / 2)
			});
			console.log('this is the worked hours', timeStamp);
			} catch (error:any) {
			console.log(error.message);
			}
		};
	  
	useEffect(() => {
		setWorkedHours();
	}, [timeStamp.morningTimeOut, timeStamp.afternoonTimeOut]);


	const handleTimeOut = async () => {
		const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();
		const isLateMorningClick = currentMinutes > parseFloat(schedule.startshift) * 60 && timeStamp.morningTimeIn && !timeStamp.morningTimeOut;
		const isAfternoon =  currentMinutes < parseFloat(schedule.endshift) * 60 && timeStamp.afternoonTimeIn && !timeStamp.afternoonTimeOut;
		const isOvertimed = currentMinutes > parseFloat(schedule.endshift) * 60 && currentMinutes < 22 * 60 && timeStamp.afternoonTimeIn && !timeStamp.afternoonTimeOut;
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
			})
		}
		else if (isAfternoon) {
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

		else if (!isAfternoon && !timeStamp.afternoonTimeOut && isOvertimed) {
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
		else {
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

	const getUserDetails = async () => {
		const res = await axios.get('/api/users/newuser');
		setData({
			username: res.data.user.name,
			employee_id: res.data.user.employee_id,
		});
	};
	const getUserInfos = async () => {
		try {
			const res = await axios.get('/api/users/schedule');
			setSchedule( res.data.result.Schedule);
			console.log('this is the schedule', res.data.result.Schedule);
			

		} catch (error: any) {
			console.log(error.message);
		} finally {
			// Any cleanup or additional actions you want to perform
			console.log('This is from the getUserInfos', schedule);
		}
	};

	
	const getBundyDetails = async () => {

		try {
			const res = await axios.get('/api/users/bundyclock')
			console.log('this is from getBundyDetails', res);
			setTimeStamp(res.data.result)
		} catch (error: any) {
			console.log(error.message);

		}

	}
	useEffect(() => {
		getUserDetails();
		getUserInfos();
		getBundyDetails();
		printtry();
		getAttendanceData();
	}, []);

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
	useEffect(() => {
		if (timeStamp.morningTimeIn && !timeStamp.morningTimeOut || timeStamp.afternoonTimeIn && !timeStamp.afternoonTimeOut) {
			setTimeInEnabled(false);
			setTimeOutEnabled(true);
		}
	}, [timeStamp])
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
					<button type="button" className="time-in-button" onClick={() => {
    handleTimeIn();
    sendData();
  }} disabled={!timeInEnabled}>
						Time In
					</button>
					<button type="button" className="time-in-button" onClick={() => {
    handleTimeOut();
    sendData();
  }} disabled={!timeOutEnabled}>
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
					<td>
							{timeStamp.date ? (
								new Date(timeStamp.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
							) : (
								"   "
							)}
							</td>						<td>{timeStamp.morningTimeIn}</td>
						<td>{timeStamp.morningTimeOut}</td>
						<td>{timeStamp.breaktimeIn}</td>
						<td>{timeStamp.breaktimeOut}</td>
						<td>{timeStamp.afternoonTimeIn}</td>
						<td>{timeStamp.afternoonTimeOut}</td>
						<td>{timeStamp.overTimeIn}</td>
						<td>{timeStamp.overTimeOut}</td>
						<td> {isNaN(parseFloat(timeStamp.tardiness)) ? 0 : timeStamp.tardiness} minute/s</td>
						<td>{isNaN(parseFloat(timeStamp.workedHours)) ? 0 : timeStamp.workedHours} hour/s</td>


					</tr>
					{attendanceData.map((attendanceItem) => (
						<AttendanceRow
						key={attendanceItem._id}
						attendanceItem={attendanceItem}
						/>
						
					))}
				</tbody>
				
			</table>
			
		</div>
	);
}