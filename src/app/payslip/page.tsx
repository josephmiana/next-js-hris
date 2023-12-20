"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import "src/styles/pdf.css";
import axios from "axios";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  faClipboardUser,
  faReceipt,
  faQuestionCircle,
  faAddressCard,
  faRightFromBracket,

  faDownload,
  faClock,
 faFolder
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";

  import { Philosopher } from "next/font/google";

// Define a style for the cursor
const cursorToPointer = {
  cursor: "pointer",
};

const PDFGenerator = () => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const periods = ['1st Period', '2nd Period'];
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const router = useRouter();
  const [payslipData, setpayslipData] = useState({
    _id: "",
    employeeinformation: {
      name: "",
      employee_id: "",
      role: "",
    },
    taxableincome: {
      salary: "",
      totalhoursworked: '',
      overtime : "",
      normalhours: '',
      totalovertime: '',
      rate: '',
      grossearnings: "",
    },
    deduction: {
      tax: "",
      pagibig: "",
      philhealth: "",
      sss: "",
      totalcontribution: "",
    },
    periodcovered: "",
    netpay: "",
    tardiness :'',
    datecreated: ""});
 
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  const getPayslip = async () => {
    try {
      const res = await axios.get(`/api/users/payslip?date=${selectedMonth}&periodcovered=${selectedPeriod}`);
      setpayslipData(res.data.payslip)
      console.log(res);
      
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Check if both selectedMonth and selectedPeriod have values
    if (selectedMonth && selectedPeriod) {
      getPayslip();      
    }
  }, [selectedMonth, selectedPeriod]);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      setLoading(true);
      toast.success("Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = React.useState(false);
  // Function to generate and save a PDF
  const generatePayslip = async () => {
    console.log(selectedMonth, selectedPeriod);
    
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [8, 11],
    });

    const contentElement = document.getElementById('content');

    if (contentElement) {
      try {

        const canvas = await html2canvas(contentElement, {
          scale: 2,

        });

        if (!canvas) {
          console.error('Canvas is null.');
          return;
        }


        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Blob is null.');
            return;
          }

          const url = URL.createObjectURL(blob);


          doc.addImage(url, 'JPEG', 1, 0, 9.1, 8);

          // Save the PDF
          doc.save('Payslip.pdf');

          URL.revokeObjectURL(url);
        });
      } catch (error) {
        console.error('Error during canvas conversion:', error);
      }
    } else {
      console.log('No content element found');
    }
  };


  return (
    <div>
      {/* Sidebar */}
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

          {/* Navigation links */}

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
            <a href="/aboutme">
              <FontAwesomeIcon icon={faAddressCard} className="fas" />
              <span className="nav-item">About Me</span>
            </a>
          </li>

          <li>
            <a href="/logins" className="logout" onClick={(e) => {
              e.preventDefault();
              logout();
            }}>
              <FontAwesomeIcon icon={faRightFromBracket} className="fas" />
              <span className="nav-item">Log-Out</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="center-wrapper">
  <div className="payslip-wrapper">
    <div id="content">
      <div className="payslip-container">
        <div className="header">
          {/* Conditionally render PAYSLIP text content */}
          <h1>{payslipData ? "P a y s l i p" : "PAYSLIP ISN'T GIVEN YET"}</h1>
        </div>

              <div className="company-name">WB MAJESTY</div>
        
              {/* Employee information */}
              <div className="employee-info">
                <p>Employee Information</p>
                <div className="info-row">
                  <span className="label">Employee Name:{payslipData?.employeeinformation.name || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Employee ID: {payslipData?.employeeinformation.employee_id || " "}</span>
                  <span className="value"></span>
                </div>

                <div className="info-row">
                  <span className="label">Position: {payslipData?.employeeinformation.role || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Total Hours of Work: {payslipData?.taxableincome.totalhoursworked || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Rate Per Hour: {payslipData?.taxableincome.rate || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Period Covered: {payslipData?.periodcovered || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Tardiness: {payslipData?.tardiness || " "}</span>
                  <span className="value"></span>
                </div>
              
                
              </div>

              {/* Taxable income */}
              <div className="earnings">
                <h3 className="section-title">Taxable Income</h3>

                <div className="earning-row">
                  <span className="label">Basic Salary: {payslipData?.taxableincome.salary || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="earning-row">
                  <span className="label">Overtime: {payslipData?.taxableincome.overtime || " "}</span>
                  <span className="value"></span>
                </div>
                <div className="earning-row">
                  <span className="label">Gross Earnings: {payslipData?.taxableincome.grossearnings || " "}</span>
                  <span className="value"></span>
                </div>
              </div>

              {/* Deductions */}
              <div className="deductions">
                <h3 className="section-title">Deductions</h3>

                <div className="deduction-row">
                  <span className="label">Pag-Ibig: {payslipData?.deduction.pagibig || " "}</span>
                  <span className="value"></span>
                </div>

                <div className="deduction-row">
                  <span className="label">PhilHealth: {payslipData?.deduction.philhealth || " "}</span>
                  <span className="value"></span>
                  
                </div>

                <div className="deduction-row">
                  <span className="label">SSS: {payslipData?.deduction.sss || " "}</span>
                  <span className="value"></span>

                </div>
                <div className="deduction-row">
                  <span className="label">Total Contribution:{payslipData?.deduction.totalcontribution || " "}</span>
                  <span className="value"></span>
                </div>
              </div>

              {/* Net Pay */}
              <div className="total">
                <span className="label">Net Pay: ₱{payslipData?.netpay || " "}</span>
                <span className="value"></span>
              </div>

            </div>
      

          </div>
          <button onClick={generatePayslip}><FontAwesomeIcon icon={faDownload} className="fas-download" /><p>Download</p> </button>

          <div className="Selection-Container">
          <div className="MonthSelection">
                <label htmlFor="monthSelect">Select a Month:</label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                </div>
                <div  className="PeriodSelection" >
                <label htmlFor="periodSelect">Select a Period:</label>
                <select id="periodSelect" value={selectedPeriod} onChange={handlePeriodChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {periods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
                </div>
                </div>
        </div>
       

              </div>
      </div>


  );
};

export default PDFGenerator;
