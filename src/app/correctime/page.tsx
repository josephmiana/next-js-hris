"use client"
import "src/styles/correctime.css";
import "src/styles/login.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for making API requests
import moment from 'moment-timezone';

// Clock component
const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
  
    // Function to update time and date
    const updateDateTime = async () => {
      try {
        // Fetch the current time and date for the Philippines from the WorldTimeAPI
        const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Manila');
        const philippinesTime = moment(response.data.utc_datetime).tz('Asia/Manila').format('HH:mm:ss');
        const philippinesDate = moment(response.data.utc_datetime).tz('Asia/Manila').format('MMMM D, YYYY');
  
        setTime(philippinesTime);
        setDate(philippinesDate);
      } catch (error) {
        console.error('Error fetching time and date:', error);
      }
    };
  
    // Set up interval to update time and date every second
    useEffect(() => {
      const intervalId = setInterval(updateDateTime, 1000);
      
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
  
    return (
        <div className="clock-container">
        <h2 className="title">Philippines Time:</h2>
        <div className="time">{time}</div>
        <h2 className="title">Philippines Date:</h2>
        <div className="date">{date}</div>
      </div>
    );
  };
  
  export default Clock;