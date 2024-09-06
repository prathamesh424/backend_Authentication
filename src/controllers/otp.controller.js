import nodemailer from 'nodemailer';

// Generate OTP
export const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    return otp.toString();
};

// Send OTP Email
export const sendOTPEmail = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email id
                pass: process.env.EMAIL_PASS  // Your password
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};
