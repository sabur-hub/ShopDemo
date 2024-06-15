import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';

export default function Profile() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1); // 1: enter phone, 2: enter code
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('https://panjakent.shop:7000/api/check-session', { withCredentials: true });
        if (response.data.verified) {
          setProfile({ phone_number: response.data.phone_number });
          setStep(3); // Show profile
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };
    checkSession();
  }, []);

  const handleSendSMS = async () => {
    try {
      const response = await axios.post('https://panjakent.shop:7000/api/send-sms',
        { phone_number: phone },
        { withCredentials: true }
      );
      console.log(`SMS sent. Server response: ${response.data.message}`);
      setStep(2);
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Error sending SMS. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('https://panjakent.shop:7000/api/verify-code',
        { code },
        { withCredentials: true }
      );
      console.log(`Verification result: ${response.data.message}`);
      setProfile({ phone_number: phone });
      setStep(3); // Show profile
      alert(`Verification result: ${response.data.message}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Error verifying code. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://panjakent.shop:7000/api/logout', {}, { withCredentials: true });
      console.log(`Logout result: ${response.data.message}`);
      setProfile(null);
      setStep(1); // Reset to initial step
      alert(`Logout result: ${response.data.message}`);
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      {step === 1 ? (
        <>
          <label className={styles.label}>
            Phone number:
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendSMS}>Register</button>
        </>
      ) : step === 2 ? (
        <>
          <label className={styles.label}>
            Verification code:
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify</button>
        </>
      ) : (
        <>
          <p>Phone number: {profile && profile.phone_number}</p>
          <p>Welcome to your profile!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}
