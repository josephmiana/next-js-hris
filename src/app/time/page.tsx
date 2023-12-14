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
	
	const logout = async () => {

		try{
		   await axios.get('/api/users/logout')
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
			
		}
		
	}
	
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
		
	};
	
	const getUserDetails = async () => {
		const res = await axios.get('/api/users/newuser');
		setData({
			username: res.data.user.name,
			employee_id: res.data.user.employee_id,
		});
	};
	type ProductType = {
		_id: string,
		employee_id: string;
		time_in: string;
		time_out: string;
		date: string;
		over_time: string;
		tardiness: string;
	};

	type ProductRowProps = {
		attendanceItem: ProductType;
		key: React.Key; 
	};

	function AttendanceRow({ attendanceItem }: ProductRowProps) {
		return (
			<tr>
				<td>{attendanceItem.date}</td>
				<td>{attendanceItem.time_in}</td>
				<td>{attendanceItem.time_out}</td>

				<td>{attendanceItem.time_in}</td>
				<td>{attendanceItem.time_out}</td>

				<td>{attendanceItem.time_in}</td>
				<td>{attendanceItem.time_out}</td>

				<td>{attendanceItem.time_out}</td>
				
			</tr>
		);
	}

	const [attendanceData, setAttendanceData] = useState<ProductType[]>([]);
	const [selectedOption, setSelectedOption] = useState('');
	const handleChange = (e) => {
		const selectedValue = e.target.value;
		setSelectedOption(selectedValue);
	
		// Find the corresponding attendance item based on the selected value
		const selectedAttendanceItem = attendanceData.find(item => item.date === selectedValue);
	
		// Print the time_in value
		if (selectedAttendanceItem) {
		  console.log('this is it',selectedAttendanceItem.time_in);
		}
	  };
	const getAttendanceData = async () => {
		try {
			const res = await axios.get('/api/users/time'); // Replace with your actual endpoint
			setAttendanceData(res.data.user); // Assuming the response contains an array of attendance data

		} catch (error: any) {
			console.error(error.message);
			// Handle error
		}
	};

	useEffect(() => {
		getUserDetails();
		getAttendanceData(); // Fetch attendance data when the component mounts
	}, []);

	const [loading, setLoading] = React.useState(false);

	const formattedTime = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	  });
	
	  const onLogInandOut = () => {
		setBundy({
		  ...bundy,
		  time: formattedTime,
		});
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
	  }, [bundy,bundy.time]);

	

	const [data, setData] = React.useState({
		username: '',
		employee_id: '',
	});

	

	  
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
								logout();
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
          <p className="date">
             {currentDateTime.toLocaleDateString()}
          </p>
        </div>

    <div>
          <button type="button" onClick={handleTimeInClick} className="time-in-button">
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
	
	<span className="label">Total Tardiness:{}</span>
	<span className="value"></span>
  <div className="total"></div>
<span className="label">Total Overtime:{}</span>
<span className="value"></span>
</div>
					
				</aside>
			
 

			</div>

			
		
				
  <table>
    <thead>
      <tr>
	      <th rowSpan={2}>Days</th>
          <th colSpan={2}>Morning</th>
          <th colSpan={2}>Afternoon</th>
		  <th colSpan={2}>Overtime</th>
          <th rowSpan={2}>Hours Worked</th>
         
      </tr>
	   <tr>
          {/* Morning columns */}
          <th>Time In</th>
          <th>Time Out</th>
        

          {/* Afternoon columns */}
          <th>Time In</th>
          <th>Time Out</th>
         
          {/* overtime */}
		  <th>IN</th>
          <th>Out</th>

		
       

		
        </tr>
		
    </thead>
    <tbody>
      {attendanceData.map((attendanceItem) => (
        <AttendanceRow
          key={attendanceItem._id}
          attendanceItem={attendanceItem}
        />
      ))}
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

  