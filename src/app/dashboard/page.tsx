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
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast"

export default function DashboardPage(){
	const router = useRouter()
    const [data, setData] = React.useState({
        username: "",
        employee_id: "",
    })

    const logout = async () => {
        try{
           await axios.get('/api/users/logout')
            setLoading(true);
            toast.success("Logout Success");
            router.push("/login");
        }catch(error: any){
            console.log(error.message);
            toast.error(error.message);
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
    }
	type ProductType = {
		employee_id: string,
		timeIn: string,
		timeOut: string,
		date: string,
	};
	const [attendanceData, setAttendanceData] = useState<ProductType[]>([]);

	const getAttendanceData = async () => {
		try {
		  const res = await axios.get('/api/users/time'); // Replace with your actual endpoint
		  setAttendanceData(res.data); // Assuming the response contains an array of attendance data
		} catch (error: any) {
		  console.error(error.message);
		  // Handle error
		}
	  };
	
	  useEffect(() => {
		getUserDetails();
		getAttendanceData(); // Fetch attendance data when the component mounts
	  }, []);
	useEffect(() => {
		getUserDetails();
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
							<span className="nav-e">{loading ? "Processing ..." : "Employee"}</span>
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
			<div className="title">
				<h1>ATTENDANCE</h1>
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
					<p> Employee ID: <span>{data.employee_id}</span>{' '}</p>
					<p> Position: <span>{data.username}</span>{' '}</p>
				</aside>
			</div>
			<div className="outer">
        <div className="table-w">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendanceItem) => (
                <tr key={attendanceItem.employee_id}>
                  <td>{attendanceItem.date}</td>
                  <td>{attendanceItem.timeIn}</td>
                  <td>{attendanceItem.timeOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
