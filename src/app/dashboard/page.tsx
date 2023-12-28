'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/styles/style.css';
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
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function DashboardPage() {

	const months = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	  ];
	  const periods = ['1st Period', '2nd Period'];
	  const [selectedMonth, setSelectedMonth] = useState('');
	  const [selectedPeriod, setSelectedPeriod] = useState('');
	const router = useRouter();
	const [data, setData] = React.useState({
		username: '',
		employee_id: '',
	});
	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	  };
	  const handlePeriodChange = (event) => {
		setSelectedPeriod(event.target.value);
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
		breaktime:string;
		over_time:string;
		tardiness:string;
	};

	type ProductRowProps = {
		attendanceItem: ProductType;
		key: React.Key; // You can use 'React.Key' for the type of 'key'
	};

	function AttendanceRow({ attendanceItem }: ProductRowProps) {
		return (
			<tr>
				<td>{attendanceItem.date}</td>
				<td>{attendanceItem.time_in}</td>
				<td>{attendanceItem.time_out}</td>
				<td>{attendanceItem.breaktime}</td>
				<td>{attendanceItem.over_time}</td>
				<td>{attendanceItem.tardiness}</td>
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
								{loading ? 'Processing ...' : 'Employee'}
							</span>
						</a>
					</li>
					<li>
						<a href="/time">
							<FontAwesomeIcon
								icon={faClock}
								className="fas"
							/>
							<span className="nav-item">Time in</span>
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
							href="/logout"
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
			
			<div className="title">
				<h1>ATTENDANCE REPORT</h1>
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
        <th>Day</th>
        <th>Time In</th>
        <th>Time Out</th>
		<th>Breaktime</th>
							
		<th>Overtime</th>
		<th>Tardiness</th>
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
 

	   <div className="Selection-Container">
          <div className="MonthSelection">
			<span>Select a Month</span>
                <label htmlFor="monthSelect"></label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                </div>
                <div  className="PeriodSelection" >
				<span>Select a Period</span>
                <label htmlFor="periodSelect"></label>
                <select id="periodSelect" value={selectedPeriod} onChange={handlePeriodChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {periods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
                </div>
                </div>


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
