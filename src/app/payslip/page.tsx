"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import "src/styles/pdf.css";
import axios from "axios";
import { NextResponse } from "next/server";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";
import {
  faClipboardUser,
  faReceipt,
  faQuestionCircle,
  faAddressCard,
  faRightFromBracket,
  faFileDownload,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "src/styles/pdf.css";

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
  const periods = ['1st period', '2nd period'];
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const router = useRouter();
  // value checker for datas from MongoDB
  const [data, setData] = React.useState({
    username: "",
    _id: "",
    overtime: "",
    position: "",
    cover: "",
    pagibig: "150 PHP",
    philHealth: "150 PHP",
    SSS: "150PHP",
    contribution: "600 PHP",
  });
  useEffect(() => {
    // Check if both selectedMonth and selectedPeriod have values
    if (selectedMonth && selectedPeriod) {
      // You can perform any actions here when both the selected month and period are chosen
      // For example, setMonthsData(selectedMonth, selectedPeriod);
      console.log('Selected Month:', selectedMonth);
      console.log('Selected Period:', selectedPeriod);
    }
  }, [selectedMonth, selectedPeriod]);
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };
  const [computeData, setcomputeData] = React.useState({
    days: "",
    rate: "",
  })
  const [computation, setcomputation] = React.useState({
    totalcontribution: "",
    netpay: "",
    gross: "",
    basicsalary: "",
  })
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
  const getUserPayslip = async () => {
    const rep = await axios.get("/api/users/payslip");
    setcomputeData({
      days: rep.data.user.daysofWork,
      rate: rep.data.user.rateperDay,
    });
  }

  const [loading, setLoading] = React.useState(false);
  // Function to generate and save a PDF
  const generatePayslip = async () => {
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
              <img src="/images/logo.png" alt="" />
              <span className="nav-e">Employee</span>
            </a>
          </li>

          {/* Navigation links */}
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
                <h1>P a y s l i p</h1>
              </div>

              <div className="company-name">WB MAJESTY</div>
              <div>
                <label htmlFor="monthSelect">Select a Month:</label>
                <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
                </div>
                <div>
                <label htmlFor="periodSelect">Select a Period:</label>
                <select id="periodSelect" value={selectedPeriod} onChange={handlePeriodChange}>
                  <option value="" disabled>-- Select Option --</option>
                  {periods.map((period, index) => (
                    <option key={index} value={period}>{period}</option>
                  ))}
                </select>
              </div>
              {/* Employee information */}
              <div className="employee-info">
                <p>Employee Information</p>
                <div className="info-row">
                  <span className="label">Employee Name: {data.username}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Employee ID: {data._id}</span>
                  <span className="value"></span>
                </div>

                <div className="info-row">
                  <span className="label">Position: {data.position}</span>
                  <span className="value"></span>
                </div>
                <div className="info-row">
                  <span className="label">Period Covered: {data.cover}</span>
                  <span className="value"></span>
                </div>
              </div>

              {/* Taxable income */}
              <div className="earnings">
                <h3 className="section-title">Taxable Income</h3>

                <div className="earning-row">
                  <span className="label">Basic Salary: {computation.basicsalary}</span>
                  <span className="value"></span>
                </div>
                <div className="earning-row">
                  <span className="label">Overtime: {data.overtime}</span>
                  <span className="value"></span>
                </div>
                <div className="earning-row">
                  <span className="label">Gross Earnings: {computation.gross}</span>
                  <span className="value"></span>
                </div>
              </div>

              {/* Deductions */}
              <div className="deductions">
                <h3 className="section-title">Deductions</h3>

                <div className="deduction-row">
                  <span className="label">Pag-Ibig: {data.pagibig}</span>
                  <span className="value"></span>
                </div>

                <div className="deduction-row">
                  <span className="label">PhilHealth: {data.philHealth}</span>
                  <span className="value"></span>
                </div>

                <div className="deduction-row">
                  <span className="label">SSS: {data.SSS}</span>
                  <span className="value"></span>
                </div>
                <div className="deduction-row">
                  <span className="label">Total Contribution: {computation.totalcontribution} PHP</span>
                  <span className="value"></span>
                </div>
              </div>

              {/* Net Pay */}
              <div className="total">
                <span className="label">Net Pay: ₱{computation.netpay}</span>
                <span className="value"></span>
              </div>

            </div>

          </div>
          <button onClick={generatePayslip}><FontAwesomeIcon icon={faDownload} className="fas-download" /> </button>
        </div>

      </div>

    </div>
  );
};

export default PDFGenerator;
