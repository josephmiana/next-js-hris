"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import "src/styles/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';
import "src/styles/verify.css"
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
            console.log(res.data.env);
            
        } catch (error:any) {
            console.log(error.message);
            
        }
    }
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
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="button" type="button" onClick={sendEmail}>
          Send Email
        </button>
        <button
          className="button-secondary"
          type="button"
          onClick={retrieveEmail}
        >
          Search
        </button>
      </div>
    );
  }