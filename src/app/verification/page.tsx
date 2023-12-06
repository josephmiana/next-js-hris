"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import "src/styles/login.css";
import axios from "axios";
import Swal from "sweetalert2";
import emailjs from 'emailjs-com';

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
        <div>
          <label className="text-green-500">Email</label>
          <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-green-500"type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <button 
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-green-500" 
          type="button" 
          value="Send"
          onClick={sendEmail}>Send Email</button>
          <button 
          className="p-2 border border-gray-300 rounded-lg mb-4 text-green-500"
          type="button"
          onClick={retrieveEmail}
          >Search</button>
        </div>
    )
}