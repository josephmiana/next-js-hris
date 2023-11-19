"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "src/styles/login.css";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Success");
  
      // Redirect to the dashboard page after successful login
      window.location.href = "/dashboard";
    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (user.name.length > 1 && user.password.length > 1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [selectedRole, setSelectedRole] = useState("Portal");
  const [bundy, setBundy] = React.useState({
    employee_id: "",
    time: "",
  });

  const onLogInandOut = () => {
    const currentTime = new Date().toLocaleTimeString();
    setBundy({ ...bundy, time: currentTime });
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post("/api/users/bundyclock", bundy);
        console.log("Recorded!", response.data);
        toast.success("Record Success!");
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    if (bundy.time !== "") {
      postData();
    }
  }, [bundy.time]);

  const handleDropdownChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <div className="LoginForm">
      <h1>{loading ? "Processing ..." : "Login to Your Account"}</h1>
      <p>Welcome to WBMAJESTY</p>

      <form id="loginForm">
        {selectedRole !== "Portal" && (
          <div className="form-group">
            <input
              type="text"
              placeholder="ID"
              id="id"
              name="ID"
              value={bundy.employee_id}
              onChange={(e) => setBundy({ ...bundy, employee_id: e.target.value })}
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="icon "
              fill="white"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
        )}

        {selectedRole !== "Attendance" && (
          <div className="form-group">
            <input
              type="text"
              placeholder="username"
              id="username"
              name="username "
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              required
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="icon "
              fill="white"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
          </div>
        )}

        {selectedRole !== "Attendance" && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Password "
              id="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              className="icon "
              fill="white">
            
              <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
            </svg>
          </div>
        )}
        <div className="form-group">
          {selectedRole !== "Attendance" && (
            <button type="button" onClick={onLogin} disabled={buttonDisabled}>
              Log in
            </button>
          )}
          <select
            className="roles"
            name="role"
            value={selectedRole}
            onChange={handleDropdownChange}
          >
            <option value="Portal">Portal</option>
            <option value="Attendance">Attendance</option>
          </select>
        </div>
        <div className="error" id="errorMessage"></div>
      </form>

      <div>
        {selectedRole !== "Portal" && (
          <div>
            <button className="time" onClick={() => onLogInandOut()}>
              Time
            </button>
            <p className="my-6">Time right now: {bundy.time}</p>
          </div>
        )}
        {/* Render the current time */}
      </div>
    </div>
  );
}
