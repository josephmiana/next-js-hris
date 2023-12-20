"use client";
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import "src/styles/correctime.css";

// Clock component
const Clock = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  // Function to update time and date
  const updateDateTime = () => {
    const philippinesDateTime = moment().tz('Asia/Manila');
    const philippinesTime = philippinesDateTime.format('HH:mm:ss');
    const philippinesDate = philippinesDateTime.format('MMMM D, YYYY');

    setTime(philippinesTime);
    setDate(philippinesDate);
  };

  // Set up interval to update time and date every second
  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Update time and date on mount
    updateDateTime();
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
