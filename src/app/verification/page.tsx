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
      };
    return (
      
        <div className="container">
         <p>  <FontAwesomeIcon icon={ faCheckCircle} className="fas-verify" /></p>
        
        <h2 className="label"> Please verify your Email</h2>
       
     
       <input type= "text"></input>
        <button className="button" type="button" onClick={sendEmail}>
          Search Email
        </button>
       <a ><button className="button" type="button" >
         Send Email
        </button></a> 
      
      </div>
    );
  }