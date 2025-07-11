import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';
import OTPInput from '../components/OTPInput';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [otp, setOtp] = useState('');
  const { signup, isSigningUp, verifyOtp, isVerifyingOtp, otpStep } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full Name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error('Invalid email format');
    if (!formData.password.trim()) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long');
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) await signup(formData);
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return toast.error('OTP is required');
    const result = await verifyOtp(formData.email, otp);
    if (result === true) {
      setFormData({ fullName: '', email: '', password: '' });
      setOtp('');
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content grid lg:grid-cols-2 transition-colors duration-300">
      {/* left side */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary group-hover:text-primary/80 transition-colors" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">Get started with your free account</p>
            </div>
          </div>

          {!otpStep ? (
            // Sign Up Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    className="input input-bordered w-full pl-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    aria-label="Full Name"
                    autoFocus
                    autoComplete='name'
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full pl-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete='email'
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="size-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input input-bordered w-full pl-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5 text-base-content/40" />
                    ) : (
                      <Eye className="size-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02]"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="form-control items-center justify-center">
                <label className="label">
                  <span className="label-text font-medium text-xl">Enter OTP</span>
                </label>
                <OTPInput otp={otp} setOtp={setOtp} />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02]"
                disabled={isVerifyingOtp || otp.length < 6}
              >
                {isVerifyingOtp ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>
          )}

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{' '}
              <Link to="/login" className="link link-primary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
}

export default SignUpPage;
