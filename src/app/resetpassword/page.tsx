"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import 'src/styles/resetpass.css';
import "src/styles/login.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

 faLockOpen,

} from '@fortawesome/free-solid-svg-icons';
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
            Swal.fire({
              position: 'top-end', // Position to top-end
              icon: 'success',
              title: 'Successfully Password Reset!',
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
            }).then(() => {
              window.location.href = "/login";
            });
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
            Swal.fire({
              position: 'top-end', // Position to top-end
              icon: 'error',
              title: 'Unsuccessful Password reset',
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
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        console.log(urlToken)
    },[])
   

    return (
        <div className="flex-container">
           <FontAwesomeIcon icon={ faLockOpen} className="fas-verify" />
        <h1 className="heading-1">Change Password</h1>
       <p>Ensure you choose a strong and unique password to enhance the safety of your account.</p>
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