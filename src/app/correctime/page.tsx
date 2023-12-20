"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import "src/styles/correctime.css";

const Clock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  const updateDateTime = async () => {
    try {
      // Axios will automatically use the proxy configured in package.json during development
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Manila');
      const philippinesTime = moment(response.data.utc_datetime).tz('Asia/Manila').format('HH:mm:ss');
      const philippinesDate = moment(response.data.utc_datetime).tz('Asia/Manila').format('MMMM D, YYYY');

      setTime(philippinesTime);
      setDate(philippinesDate);
    } catch (error) {
      console.error('Error fetching time and date:', error);
    }
  };

  useEffect(() => {
    // Update time and date on mount
    updateDateTime();

    // Set up interval to update time and date every second
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
