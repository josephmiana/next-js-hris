"use client";
import React, { useEffect } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "src/styles/pdf.css";

// Define a style for the cursor
const cursorToPointer = {
  cursor: "pointer",
};

const PDFGenerator = () => {
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
  const [computeData, setcomputeData] = React.useState({
    days:"",
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
  const getUserPayslip = async() => {
    const rep = await axios.get("/api/users/payslip");
    setcomputeData({
      days: rep.data.user.daysofWork,
      rate: rep.data.user.rateperDay,
    });
  }
  const getUserDetails = async () => {
    
    const res = await axios.get("/api/users/newuser");
    setData({
      username: res.data.user.name,
      _id: res.data.user._id,
      overtime: '570',
      position: res.data.user.position,
      cover: 'Monthly',
      pagibig: "100 PHP",
      philHealth : "319.20 PHP",
      SSS : "720 PHP",
      contribution: "",
    });
  };
  const totalcontrib = parseFloat(data.SSS) + parseFloat(data.pagibig) + parseFloat(data.philHealth)
  const salarycomputation = parseFloat(computeData.days) * parseFloat(computeData.rate);
  const grossearnings = salarycomputation + 570
  const netpaycompute =  grossearnings - totalcontrib 
  const getComputation = async() => {
    setcomputation({
      gross: grossearnings.toString(),
      netpay: netpaycompute.toString(),
      totalcontribution: totalcontrib.toString(),
      basicsalary: salarycomputation.toString(),
    });
  }
  console.log
  useEffect(() => {
    getUserDetails();
    getUserPayslip();
    getComputation();
  }, []);

  const [loading, setLoading] = React.useState(false);
  // Function to generate and save a PDF
  const generatePDF = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "in",
      format: [9.3, 11],
    });

    // Set the font size
    doc.setFontSize(1); // You can adjust the font size as needed

    // Reference to the HTML content element
    const contentElement = document.getElementById("content");
    try {
      if (contentElement) {
        // Use html2canvas to convert HTML to an image
        const canvas = await html2canvas(contentElement);
        const imageData = canvas.toDataURL("image/png");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imageWidth = pageWidth; // Set the width of the image to match the page width
        const imageHeight = (canvas.height * imageWidth) / canvas.width; // Maintain aspect ratio

        // Add the image to the PDF with the calculated center position
        doc.addImage(imageData, "PNG", -0.3, -0.1, imageWidth, imageHeight); //x , y

        // Save the PDF
        doc.save("Payslip.pdf");
        // Rest of your code
      } else {
        throw new Error("Content element not found");
      }
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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

          {/* Download Payslip button */}
          <li>
            <a onClick={generatePDF} style={cursorToPointer}>
              <FontAwesomeIcon icon={faFileDownload} className="fas" />
              <span className="nav-item">Download </span>
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
        </div>
      </div>
    </div>
  );
};

export default PDFGenerator;
