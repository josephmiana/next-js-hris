"use client";

import axios from "axios";
import Link from "next/link"
import React, { useEffect, useState } from "react";
import emailjs from 'emailjs-com';

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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Recover Password</h1>
            <label htmlFor="email" className="mt-2">Email</label>
            <input
            className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-non focus:border-gray-600" 
            id="email"
            type="text"
            value={email}
            placeholder="user@mail.com"
            onChange={(e) => setEmail(e.target.value)}
            />
             <button
                onClick={onReset}
                disabled={buttonDisabled}
                className={`my-5 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-black'}`}>
                Send to Email
            </button>
        </div>
    )
    }


