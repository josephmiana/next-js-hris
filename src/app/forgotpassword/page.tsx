"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import emailjs from 'emailjs-com';
import "src/styles/login.css";
import "src/styles/forgotpass.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

 faKey,

} from '@fortawesome/free-solid-svg-icons';
export default function ForgotPasswordPage(){
    const [email, setEmail] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (email.length > 3){
            setButtonDisabled(false)
        } else{
            setButtonDisabled(true)
        }
    },[email])
    const [sentemail, setsentEmail] = useState({
        token: '',
    env: '',})
    
    const onReset = async () => {
        const response = await axios.post("/api/users/emailreset", {email: email});
        console.log(response.data);
        setsentEmail({
            token: response.data.tokenforreset,
            env: response.data.env,
        })
        
    }
    useEffect(() => 
    {
        if(sentemail.env && sentemail.token)
        {
            sendmail();
        }
        
    }, [sentemail.env, sentemail.token])
    const sendmail = async() => 
    {
        try {
            var params = {
                "message": `${sentemail.env}/resetpassword?token=${sentemail.token}.`,
                "from_name": 'ABC',
                "email": 'joseph.miana.c@gmail.com',
            }
            console.log('before sending');
            console.log(email);
            
            await emailjs.send(
                "service_kfunb5g",
                "template_htruiid",
                params,
                "LXtFt1PGcyLMMhpI0"
            );
            console.log('success!');
            
        } catch (error: any) {
            console.log(error.message);
        }
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
        placeholder="user@mail.com"
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