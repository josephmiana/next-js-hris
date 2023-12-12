"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import 'src/styles/resetpass.css';
import "src/styles/login.css";
export default function VerifyEmailPage(){
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (password.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[password])

    const changePassword = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token, password})
            setVerified(true)
            console.log(`setVerified: ${setVerified}`)
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        console.log(urlToken)
    },[])
   

    return (
        <div className="flex-container">
        <h1 className="heading-1">Change Password</h1>
        <div className="mb-5">
          {verified && (
            <div>
              <h2 className="heading-2">Email Verified</h2>
              <Link href ="/login">Login</Link>
            </div>
          )}
          {error && (
            <div className="error-container">
              <h2 className="heading-2">Error</h2>
            </div>
          )}
        </div>
        <label className="label" htmlFor="password">
          New Password
        </label>
        <input
          className="input-field"
          id="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={changePassword}
          disabled={buttonDisabled}
          className={`button ${buttonDisabled ? 'disabled' : ''}`}
        >
          Change Password
        </button>
      </div>
    );
  }