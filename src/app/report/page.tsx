"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "src/app/adminstyles/reports.css";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  faChartLine,
  faReceipt,
  faUserPlus,
  faSearch,
  faFile,
  faRightFromBracket,
  faClipboardUser,
  faHistory,
  faLeftLong,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import router from "next/router";
import Swal from "sweetalert2";

export default function SignupPage() {
  const [page, setPage] = useState(1);
  //bundy
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("");
  const [month, setMonth] = useState("");
//payslip
  const [payslipName, setPayslipName] = useState("");
  const [payslipPeriod, setPayslipPeriod] = useState("");
  const [payslipMonth, setPayslipMonth] = useState("");
//201Files
  const [fileName, setfileName] = useState('');
  const [uiMode, setUIMode] = useState("main");

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };
  const resetVariables  = () =>{
    setPayslipMonth('');
      setPayslipPeriod('');
      setPayslipName('');
      setName('');
      setPage(1);
      setPeriod('');
      setMonth('');
  }
  const handleSwitchUIMode = (newMode) => {
    setUIMode(newMode);
    if(uiMode === 'payslip' || 'main' || '201File' || 'attendance')
    {
      resetVariables();
    }
  };

  const generateAttendance = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [8, 11],
    });

    const contentElement = document.getElementById("content");

    if (contentElement) {
      try {
        const canvas = await html2canvas(contentElement, {
          scale: 2,
        });

        if (!canvas) {
          console.error("Canvas is null.");
          return;
        }

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Blob is null.");
            return;
          }

          const url = URL.createObjectURL(blob);

          // Add the image to the jsPDF instance
          doc.addImage(url, 'JPEG', 1, 0, 6, 0);
  
          // Save the PDF
          doc.save("Attendance.pdf");

          // Clean up the URL object
          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error("Error during canvas conversion:", error);
      }
    } else {
      console.log("No content element found");
    }
  };
  const [loading, setLoading] = React.useState(false);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setLoading(true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout Success!",
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: "#efefef",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      }).then(() => {
        window.location.href = "/login";
      });
    } catch (error: any) {
      console.log(error.message);
      Swal.fire({
        position: "top-end", // Position to top-end
        icon: "error",
        title: "Unsuccessful Logout!",
        showConfirmButton: false,
        timer: 2000,
        toast: true, // Enable toast mode
        background: "#efefef",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  type ProductType = {
    _id: string;
    employee_id: string;
    time_in: string;
    time_out: string;
    name: string;
    date: string;
  };

  type ProductRowProps = {
    attendanceItem: ProductType;
    key: React.Key; // You can use 'React.Key' for the type of 'key'
  };

  function AttendanceRow({ attendanceItem }: ProductRowProps) {
    return (
      <tr>
        <td>{attendanceItem.employee_id}</td>
        <td>{attendanceItem.name}</td>
        <td>{attendanceItem.date}</td>
        <td>{attendanceItem.time_in}</td>
        <td>{attendanceItem.time_out}</td>
      </tr>
    );
  }
  const [attendanceData, setAttendanceData] = useState<ProductType[]>([]);


  const generatePayslip = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [10, 16.2],
    });
    const contentElement = document.getElementById("content");
    if (contentElement) {
      try {
        const canvas = await html2canvas(contentElement, {
          scale: 2,
        });
        if (!canvas) {
          console.error("Canvas is null.");
          return;
        }

        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Blob is null.");
            return;
          }

          const url = URL.createObjectURL(blob);
  
    
          doc.addImage(url, 'JPEG', 0, 0, 10, .0);
  
          // Save the PDF
          doc.save("Payslip.pdf");

          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error("Error during canvas conversion:", error);
      }
    } else {
      console.log("No content element found");
    }
  };
  const generate201file = async () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'in',
      format: [8, 11],
    });

    const contentElement = document.getElementById("content");

    if (contentElement) {
      try {
        const canvas = await html2canvas(contentElement, {
          scale: 2,
        });
        if (!canvas) {
          console.error("Canvas is null.");
          return;
        }
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error("Blob is null.");
            return;
          }
          const url = URL.createObjectURL(blob);
  
        
          doc.addImage(url, 'JPEG', .2, 0, 7.5, 0);
  
          // Save the PDF
          doc.save("Attendance.pdf");
          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error("Error during canvas conversion:", error);
      }
    } else {
      console.log("No content element found");
    }
  };

  const [notif, setNotif] = React.useState(0);
  const fetchNotif = async () => {
    try {
      const response = await axios.get("api/users/notification");
      setNotif(response.data.count);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchNotif();
  }, []);

    //BUNDYCLOCK TAB

  const fetchBundy = async () => {
    try {
      const res = await axios.get(
        `api/reports/bundy?page=${page}&name=${name}&period=${period}&month=${month}`
      );
      setAttendanceData(res.data.data);
      console.log(res);
    } catch (error:any) {
      console.log(error.any);
    }
  };

  useEffect(() => {
    fetchBundy();
  }, [page, name, period, month]);

//PAYSLIP FUNCTIONS
type PayslipType = {
  _id: string;
  periodcovered: string;
  date: string;
  employeeinformation: {
    name: string;
    employee_id: string;
    role: string;
  },
  taxableincome: {
    days: string;
    salary: string;
    overtime: string;
    grossearnings: string;
  },
  deduction: {
    totalcontribution: string;
  }
};

type PayslipRowProps = {
  payslipItem: PayslipType;
  key: React.Key; // You can use 'React.Key' for the type of 'key'
};

function PayslipRow({ payslipItem }: PayslipRowProps) {
  return (
    <tr>
      <td>{payslipItem.employeeinformation.name}</td>
      <td>{payslipItem.employeeinformation.employee_id}</td>
      <td>{payslipItem.employeeinformation.role}</td>
      <td>{payslipItem.periodcovered}</td>
      <td>{payslipItem.taxableincome.days}</td>
      <td>{payslipItem.taxableincome.salary}</td>
      <td>{payslipItem.taxableincome.overtime}</td>
      <td>{payslipItem.taxableincome.grossearnings}</td>
      <td>{payslipItem.deduction.totalcontribution}</td>

    </tr>
  );
}
const [payslipData, setPayslipData] = useState<PayslipType[]>([]);

  const fetchPayslip = async () => {
    try {
      const res = await axios.get(
        `api/reports/payslip?name=${payslipName}&month=${payslipMonth}&period=${payslipPeriod}&page=${page}`
      );
      setPayslipData(res.data.data);
      console.log(res);
    } catch (error:any) {
      console.log(error.any);
    }
  };

  useEffect(() => {
    fetchPayslip();
  }, [page, payslipName, payslipPeriod, payslipMonth]);

//201 FILES TAB
type FileType = {
  _id: string;
  requestfile: string;
  date: string;
  name: string;
  isVerified: boolean;

};

type FileRowProps = {
  FileItem: FileType;
  key: React.Key; // You can use 'React.Key' for the type of 'key'
};

function FilesRow({ FileItem }: FileRowProps) {
  return (
    <tr>
      <td>{FileItem.name}</td>
      <td>{FileItem.requestfile}</td>
      <td>{FileItem.date}</td>
      <td>{FileItem.isVerified}</td>
    </tr>
  );
}
const [fileData, setFileData] = useState<FileType[]>([]);

  const fetchFile = async () => {
    try {
      const res = await axios.get(
        `api/reports/201files?name=${fileName}&page=${page}`
      );
      setFileData(res.data.data);
      console.log(res);
    } catch (error:any) {
      console.log(error.any);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [page, fileName]);

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
              {notif !== 0 && <span className="notification">{notif}</span>}
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

      {uiMode === "main" ? (
        <div className="container">
          <button
            className="mainbtn"
            onClick={() => handleSwitchUIMode("attendance")}
          >
            {" "}
            <FontAwesomeIcon icon={faClipboardUser} className="fas-button" />
            <p>Attendance</p>
          </button>
          <button
            className="mainbtn"
            onClick={() => handleSwitchUIMode("payslip")}
          >
            {" "}
            <FontAwesomeIcon icon={faReceipt} className="fas-button" />{" "}
            <p> &nbsp; &nbsp;Payslip</p>
          </button>
          <button
            className="mainbtn"
            onClick={() => handleSwitchUIMode("201File")}
          >
            {" "}
            <FontAwesomeIcon icon={faFile} className="fas-button" />
            <p> &nbsp; &nbsp;201files</p>
          </button>
        </div>
      ) : uiMode === "payslip" ? (
        // Next UI content here

        <div className="container-nextui">
          <h1>Payslip</h1>

          <div className="search-form">
            <form>
              <input type="text" id="search-input"  value={payslipName} placeholder="Search" onChange={(e) => {
                const inputValue = e.target.value;
               
                const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, '');
                setPayslipName(filteredValue);}}/>
              
            </form>
          </div>
          <div id="content">
            <div className="Payslip">
              <table> 
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>ID</th>
                    <th>Position</th>
                    <th>Period Covered</th>
                    <th>Days of work</th>
                    <th>Basic Salary</th>
                    <th>Overtime</th>
                    <th>Gross Earning</th>
                    <th>Total Deduction</th>
                  </tr>
                </thead>
                <tbody>
                  {payslipData.map((payslipItem) => (
                    <PayslipRow
                      key={payslipItem._id}
                      payslipItem={payslipItem}
                    />
                  ))}
                </tbody>

              </table>
            </div>
          </div>

          <div className="Selection-Container">
            <div className="MonthSelection">
              <label htmlFor="monthSelect">Select a Month:</label>
              <select id="monthSelect" value={payslipMonth} onChange={(e) => setPayslipMonth(e.target.value)}>
              <option value="" disabled>
                  -- Select --
                </option>
                <option value="January"> January </option>
                <option value="February"> February </option>
                <option value="March"> March </option>
                <option value="April"> April </option>
                <option value="May"> May </option>
                <option value="June"> June </option>
                <option value="July"> July </option>
                <option value="August"> August </option>
                <option value="September"> September </option>
                <option value="October"> October </option>
                <option value="November"> November</option>
                <option value="December"> December </option>
              </select>
            </div>
            <div className="PeriodSelection">
              <label htmlFor="periodSelect">Select a Period:</label>
              <select id="periodSelect" value={payslipPeriod} onChange={(e) => setPayslipPeriod(e.target.value)}>
                <option value=""disabled>-- Select Option --</option>
                <option value="1st Period"> 1st Period </option>
                <option value="2nd Period"> 2nd Period </option>
              </select>
            </div>
          </div>

          <div className="next-prev" >
            <button className="previous-btn" type="button"onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="next-btn" type="button" onClick={() => setPage((prev) => prev + 1)}>
              Next
            </button>
          </div>

          <button onClick={() => handleSwitchUIMode("main")}>
            {" "}
            <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" />
            <p>Go Back</p>
          </button>
          <button onClick={generatePayslip}>
            <FontAwesomeIcon icon={faSave} className="fas-attendance " />
            <p>Download </p>{" "}
          </button>
        </div>
      ) : uiMode === "attendance" ? (
        <div className="container-nextui">
          <h1>Attendance</h1>
          <div className="search-form">
            <form>
            <input
  type="text"
  id="search-input"
  value={name}
  onChange={(e) => {
    const inputValue = e.target.value;
    // Allow only letters (A-Z, a-z)
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, '');
    setName(filteredValue);
  }}
  placeholder="Search"
/>
             
            </form>
          </div>
          <div id="content">
            <div className="attendance-ui">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
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
            </div>
          </div>
          <div className="Selection-Container">
            <div className="MonthSelection">
              <label htmlFor="monthSelect">Select a Month:</label>
              <select
                id="monthSelect"
                value={month}
                onChange={handleMonthChange}
              >
                <option value="" disabled>
                  -- Select --
                </option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="PeriodSelection">
              <label htmlFor="periodSelect">Select a Period:</label>
              <select
                id="monthSelect"
                value={period}
                onChange={handlePeriodChange}
              >
                <option value="" disabled>
                  -- Select --
                </option>
                <option value="1st Period">1st Period</option>
                <option value="2nd Period">2nd Period</option>
              </select>
            </div>
          </div>
          <div className="next-prev">
            <button className="previous-btn" type="button" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="next-btn" type="button" onClick={() => setPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
          <button onClick={() => handleSwitchUIMode("main")}>
            {" "}
            <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" />
            <p>Go Back</p>
          </button>
          <button onClick={generateAttendance}>
            <FontAwesomeIcon icon={faSave} className="fas-attendance " />
            <p>Download</p>{" "}
          </button>
        </div>
      ) : uiMode === "201File" ? (
        // Custom UI content here
        <div className="container-nextui">
          <h1>201 Files Request</h1>

          <div className="search-form">
            <form>
              <input type="text" id="search-input" placeholder="Search"value={fileName} onChange={(e) => {
                 const inputValue = e.target.value;
                 // Allow only letters (A-Z, a-z)
                 const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, '');
                setfileName(filteredValue);}}/>
              
            </form>
          </div>

          <div id="content">
            <div className="201files">
              <table>
                <thead>
                  <tr>
                    <th>Name of Requester</th>
                    <th>Request File</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((FileItem) => (
                    <FilesRow
                      key={FileItem._id}
                      FileItem={FileItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="Selection-Container"></div>
          <div className="next-prev">
            <button className="previous-btn" type="button" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
              Previous
            </button>
            <button className="next-btn" type="button"onClick={() => setPage((prev) => prev + 1)}>
              Next
            </button>
          </div>
          <button onClick={() => handleSwitchUIMode("main")}>
            {" "}
            <FontAwesomeIcon icon={faLeftLong} className="fas-attendance" />
            <p>Go Back</p>
          </button>
          <button onClick={generate201file}>
            <FontAwesomeIcon icon={faSave} className="fas-attendance" />
            <p>Download</p>
          </button>
        </div>
      ) : null}
    </div>
  );
}
