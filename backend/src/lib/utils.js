import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'

export const generateToken = async (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // milliseconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //  CSRF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    })
    return token;
}

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
    const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

