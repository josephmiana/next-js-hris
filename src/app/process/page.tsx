"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import 'src/app/adminstyles/process_payslip.css';
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  faRightFromBracket,
  faChartLine,
  faUserPlus,
  faReceipt,
  faFile,
  faEnvelope,
  faHistory,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

export default function ProcessPage() {

  //variables declaration
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [payslipData, setpayslipData] = React.useState({
    name: "",
    employee_id: "",
    role: "",
    periodcovered: "",
    salary: "",
    overtime: "",
    grossearnings: "",
    tax: "",
    pagibig: "",
    philhealth: "",
    sss: "",
    totalcontribution: "",
    netpay: "",
  });

  //function for saving and submit
  const onSaveandSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/process", payslipData);
      console.log("Saved & Submit successfully", response.data);
      toast.success("Saved & Submit successfully");

      // Redirect to the dashboard page after successful login
      window.location.href = "/admin";
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (payslipData.employee_id.length > 1 && payslipData.netpay.length > 1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [payslipData]);
  return (
    <div>
      <div className="Sidebar">
        <header className="head"></header>

        <ul>
          <li>
            <a href="#" className="logo">
              <img src="logo.jpg" alt="" />

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
            <a href="/searchemployee" >
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
            <a href="/Reports">
              <FontAwesomeIcon icon={faHistory} className="fas" />
              <span className="nav-item">Report</span>
            </a>
          </li>

          <li>
            <a href="/logins" className="logout">
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
                <h1>{loading ? "Processing ..." : "PAYSLIP PROCESS"}</h1>
              </div>



              {/* Employee information */}
              <div className="employee-info">
                <p>Employee Information</p>
                <div className="info-row">
                  <span className="label">
                    Employee Name:
                  </span>
                  <input
                    type="text"
                    name="employeename"
                    id="employeename"
                    value={payslipData.name}
                    onChange={(e) => setpayslipData({ ...payslipData, name: e.target.value })}
                  />
                </div>
                <div className="info-row">
                  <span className="label">Employee ID:</span>
                  <input
                    type="text"
                    name="employeeNo"
                    id="employeeNo"
                    value={payslipData.employee_id}
                    onChange={(e) => setpayslipData({ ...payslipData, employee_id: e.target.value })}
                  />
                </div>

                <div className="info-row">
                  <span className="label">Position:</span>
                  <input
                    type="text"
                    name="employeeNo"
                    id="employeeNo"
                    value={payslipData.role}
                    onChange={(e) => setpayslipData({ ...payslipData, role: e.target.value })} />
                </div>
                <div className="info-row">
                  <span className="label">Period Covered:</span>
                  <input
                    type="text"
                    name="employeeNo"
                    id="employeeNo"
                    value={payslipData.periodcovered}
                    onChange={(e) => setpayslipData({ ...payslipData, periodcovered: e.target.value })}
                    />
                </div>

                <div className="info-row">
                  <span className="label">Days of Work:</span>
               <input type="text" name="employeeNo" id="employeeNo" />
                </div>
              </div>

              {/* Taxable income */}
              <div className="earnings">
                <h3 className="section-title">Taxable Income</h3>

                <div className="earning-row">
                  <span className="label">Basic Salary:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.salary}
                      onChange={(e) => setpayslipData({ ...payslipData, salary: e.target.value })}
                      /></span>


                </div>
                <div className="earning-row">
                  <span className="label">Overtime:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.overtime}
                      onChange={(e) => setpayslipData({ ...payslipData, overtime: e.target.value })}
                      /></span>
                      
                </div>
                <div className="earning-row">
                  <span className="label">Gross Earnings:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.grossearnings}
                      onChange={(e) => setpayslipData({ ...payslipData, grossearnings: e.target.value })}
                      /></span>

                </div>
              </div>

              {/* Deductions */}
              <div className="deductions">
                <h3 className="section-title">Deductions</h3>

                <div className="deduction-row">
                  <span className="label">Tax:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.tax}
                      onChange={(e) => setpayslipData({ ...payslipData, tax: e.target.value })}
                      /></span>

                </div>

                <div className="deduction-row">
                  <span className="label">Pag-Ibig:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.pagibig}
                      onChange={(e) => setpayslipData({ ...payslipData, pagibig: e.target.value })}
                    /></span>

                </div>

                <div className="deduction-row">

                  <span className="label">PhilHealth:

                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.philhealth}
                      onChange={(e) => setpayslipData({ ...payslipData, philhealth: e.target.value })}
                    /></span>

                </div>

                <div className="deduction-row">
                  <span className="label">SSS:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.sss}
                      onChange={(e) => setpayslipData({ ...payslipData, sss: e.target.value })}
                    /></span>

                </div>
                <div className="deduction-row">
                  <span className="label">Total Contribution:
                    <input
                      type="text"
                      name="employeeNo"
                      id="employeeNo"
                      value={payslipData.totalcontribution}
                      onChange={(e) => setpayslipData({ ...payslipData, totalcontribution: e.target.value })}
                    /></span>

                </div>
              </div>

              {/* Net Pay */}
              <div className="total">
                <span className="label">Net Pay:</span>
                <span className="value"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="new-btn">
          <button className="btn-save"
            onClick={() => onSaveandSubmit()}
          > <FontAwesomeIcon icon={faEnvelope} className="fass" />Save & Submit </button>

        </div>
      </div>

    </div>
  );
};


