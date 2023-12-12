"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import "src/styles/login.css";
import "src/styles/forgotpass.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

 faKey,

} from '@fortawesome/free-solid-svg-icons';
export default function ForgotPasswordPage(){
    const [email, setEmail] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (email.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[email])

    const recoverUserPassword = async () => { 

    }

    const onReset = async () => {
        await axios.post("/api/users/emailreset", {email: email});
    }

    return(
        <div className="container">
            <p><FontAwesomeIcon icon={ faKey} className="fas-verify" /></p>
      <h1 className="label">Recover Password</h1>
      <label htmlFor="email" className="mt-2">
        Email
      </label>
      <input
        className="inputemail"
        id="email"
        type="text"
        value={email}
        placeholder="emai@mail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={onReset}
        disabled={buttonDisabled}
        className={`button ${buttonDisabled ? 'disabled' : ''}`}>
        Send to Email
      </button>
    </div>
  );
};