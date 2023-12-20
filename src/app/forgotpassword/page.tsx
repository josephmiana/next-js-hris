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
import Swal from "sweetalert2";
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
        token: '',})
    
    const onReset = async () => {
        const response = await axios.post("/api/users/emailreset", {email: email});
        console.log(response.data);
        setsentEmail({
            token: response.data.tokenforreset,
        })
        
    }
    useEffect(() => 
    {
        if(sentemail.token)
        {
            sendmail();
        }
        
    }, [sentemail.token])
    const sendmail = async() => 
    {
        try {
            var params = {
                "message": `https://https://next-js-hris-seppyyyys-projects.vercel.app/resetpassword?token=${sentemail.token}.`,
                "from_name": 'ABC',
                "email": email,
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
            Swal.fire({
                position: 'top-end', // Position to top-end
                icon: 'success',
                title: 'Successfully Sent!',
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
            console.log(error.message);
            Swal.fire({
                position: 'top-end', // Position to top-end
                icon: 'error',
                title: 'Unsuccessful Email Sent',
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
    
    
    return(
        <div className="container">
            <p><FontAwesomeIcon icon={ faKey} className="fas-verify" /></p>
      <h1 className="label"> Password Reset</h1>
      <p>To initiate the password reset process, an email will be sent to your registered address. <br/>
    </p>
    <p>  Please be prepared to follow the instructions in the email to regain access to your account securely.</p>
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