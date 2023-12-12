"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import "src/styles/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';
import "src/styles/verify.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {

 faCheckCircle,

} from '@fortawesome/free-solid-svg-icons';
export default function Verify()
{
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [sentemail, setsentEmail] = useState({
        token: '',
        env: '',
    });
    const sendEmail = async () => {
        try {
            var params = {
                "message": `${sentemail.env}/verifyemail?token=${sentemail.token}.`,
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
      };
    return (
      
        <div className="container">
         <p>  <FontAwesomeIcon icon={ faCheckCircle} className="fas-verify" /></p>
        
        <h2 className="label"> Please verify your Email</h2>
        <p>You&apos;re almost there! We sent an email to <strong>JosephMiana@gmail.com</strong></p>
        <p><br/> Just Click on the link in that email to complete your signup <br/> If you don&apos;t see it, you may need to <strong>Check your spam</strong> folder</p>
     
       
        <button className="button" type="button" onClick={sendEmail}>
          Resend Email
        </button>
      
      </div>
    );
  }