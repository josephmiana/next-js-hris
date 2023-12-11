"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'src/app/adminstyles/approve.css';
import Image from 'next/image';
import {
    faChartLine,
    faReceipt,
    faUserPlus,
    faSearch,
    faFile,
    faRightFromBracket,
    faFileEdit,
    faHistory,
    faLeftLong,
    faTimes,
    faCheck,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const cursorToPointer = {
    cursor: 'pointer',
};

export default function SignupPage() {
    const [uiMode, setUIMode] = useState('main'); // 'main' or 'next'

    const handleSwitchUIMode = async () => {
        setUIMode(uiMode === 'main' ? 'next' : 'main');
        // Execute additional logic or functions for 'main' mode

    };

    const [selectedUser, setSelectedUser] = useState<ProductType | null>(null);


    const [pendingFile, setPendingFile] = useState<ProductType[]>([]);

    // ALLOCATING FUNCTION
    type ProductRowProps = {
        attendanceItem: ProductType;

        key: React.Key; // You can use 'React.Key' for the type of 'key'
    };

    // TYPE FOR FETCHED DATAS
    type ProductType = {
        _id: string,
        name: string,
        employee_id: string;
        date: string;
        isVerified: boolean;
        requestfile: string;
        information: {
            employee_id: string,
            hireddate: string,
            pagibig: string,
            tin: string,
            sss: string,
        },
        employment: {
            name: String,
            date: String,
            position: String,
        }
    };
    const logout = async () => {
        try {
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

        } catch (error: any) {
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
        } finally {
            setLoading(false);

        }

    }
    const [loading, setLoading] = React.useState(false);
    function AttendanceRow({ attendanceItem }: ProductRowProps) {
        const handleUserSelect = () => {
            setSelectedUser(attendanceItem);
            handleSwitchUIMode(); // Assuming you want to switch UI mode after selecting the user
        };

        return (
            <tr>
                <td>{attendanceItem.name}</td>
                <td>{attendanceItem.employee_id}</td>
                <td>{attendanceItem.date}</td>
                <td>{attendanceItem.requestfile.includes("coe") ? "Certificate" : attendanceItem.requestfile}</td>
                <td>
                    <button className="i" onClick={handleUserSelect}>
                        <FontAwesomeIcon icon={faFileEdit} className="fass" />
                    </button>
                </td>
            </tr>
        );
    }
    const [page, setPage] = useState(1);


    const submit = async () => {
        try {
            const res = await axios.post('api/users/approverequest', selectedUser)
            handleSwitchUIMode();
            setSelectedUser(null);
            Swal.fire({
                position: 'top-end', // Position to top-end
                icon: 'success',
                title: 'Request approved!',
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
        } catch (error: any) {
            console.log('error sending data: ', error.message);

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/users/requestfiles?page=${page}`);
                setPendingFile(response.data.data)
            } catch (error: any) {
                console.error('Error fetching data:', error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [page, uiMode]);
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

            {uiMode === 'main' ? (
                <div className="container">
                    <h1>{loading ? 'Loading...' : 'Approve Request'}</h1>
                    <table id="clickable-table">
                        <thead>
                            <tr>
                                <th>Requester Name</th>
                                <th>Employee No.</th>
                                <th>Date of request</th>
                                <th>Requested File</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingFile.map((attendanceItem) => (
                                <AttendanceRow
                                    key={attendanceItem._id}
                                    attendanceItem={attendanceItem}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="btn-prev">
                        <button className="previous" type="button" onClick={() => setPage((prev) => prev - 1)}
                            disabled={page === 1}>
                            Previous
                        </button>
                        <button className="next" type="button" onClick={() => setPage((prev) => prev + 1)}>
                            Next
                        </button>
                    </div>
                </div>

            ) : (
                // Next UI content here
                <div className="content-active">

                    <form id="employee-form">
                        <div className="form-group">
                            <label >Requester Name:</label>
                            <input type="text" id="Name" value={selectedUser?.name} readOnly />
                        </div>
                        <div className="form-group">
                            <label >Employee No.:</label>
                            <input type="text" id="RequestFile" value={selectedUser?.employee_id} readOnly />
                        </div>
                        <div className="form-group">
                            <label >Date of request:</label>
                            <input type="text" id="RequestFile" value={selectedUser?.date} readOnly />
                        </div>
                        <div className="form-group">
                            <label >Requested File:</label>
                            <input type="text" id="Description" value={selectedUser?.requestfile} readOnly />
                        </div>

                    </form>
                    <button onClick={handleSwitchUIMode}> <FontAwesomeIcon icon={faLeftLong} className="fas-back" /><p>Previous</p></button>
                    <button onClick={submit}> <FontAwesomeIcon icon={faCheck} className="fas-check" /><p>Approve</p></button>
                    <button onClick={handleSwitchUIMode}> <FontAwesomeIcon icon={faTimes} className="fas-times" /><p>Deny</p></button>
                </div>
            )}
        </div>
    );
}
