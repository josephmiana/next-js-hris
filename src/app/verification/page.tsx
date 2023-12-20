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
    const retrieveEmail = async () => {
        try {
            const res = await axios.get(`/api/users/verification?email=${email}`);
            console.log(res.data.token);
            setsentEmail({
                token: res.data.token,
                env: res.data.env,
            });
            setEmail(res.data.email)
            console.log(res.data.env);
            
        } catch (error:any) {
            console.log(error.message);
            
        }
    }
    const sendEmail = async () => {
        try {
            var params = {
                "message": `https://https://next-js-hris-seppyyyys-projects.vercel.app/verifyemail?token=${sentemail.token}.`,
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
                title: 'Email Successfully Sent!',
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
                title: 'Sent Unsuccessfully!',
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
              })
              
        }
        
      };
      return (
        <div>
              <div className="container">
              <p>  <FontAwesomeIcon icon={ faCheckCircle} className="fas-verify" /></p>
          <label className="label">Please verify your Email</label>


          <input type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

          <button 
          className="button" 
          type="button" 
          value="Send"
          onClick={sendEmail}>Send Email</button>
           
          <button 
          className="button"
          type="button"
          onClick={retrieveEmail}
          >Search</button>                     

        </div>
        </div>
    )
  }