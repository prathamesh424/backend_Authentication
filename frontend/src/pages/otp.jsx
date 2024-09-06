import React, { useState } from 'react';
import axios from 'axios';

const OTPVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [step, setStep] = useState(1);
    const [message, setMessage] = useState('');

    const handleSendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/send-otp', { email });
            setMessage(response.data.message);
            setStep(2);
        } catch (error) {
            setMessage('Error sending OTP');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/verify-otp', { email, otp });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error verifying OTP');
        }
    };

    return (
        <div className="otp-verification">
            {step === 1 ? (
                <div>
                    <h2>Send OTP</h2>
                    <input
                        style={{color: 'black'}}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={handleSendOTP}>Send OTP</button>
                </div>
            ) : (
                <div>
                    <h2>Verify OTP</h2>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Enter the OTP"
                    />
                    <button onClick={handleVerifyOTP}>Verify OTP</button>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default OTPVerification;
