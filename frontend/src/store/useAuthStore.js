import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast';

export const useAuthStore = create( (set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    isVerifyingOtp: false,
    otpStep: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data})
        } catch (error) {
            console.log("Error in checkAuth: ",error);
            set({ authUser: null});
        } finally {
            set({ isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            await axiosInstance.post("/auth/signup", data);
            toast.success("OTP sent to your email");
            set({ otpStep: true, signupEmail: data.email });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    verifyOtp: async (email, otp) => {
        set({ isVerifyingOtp: true });
        try {
            const res = await axiosInstance.post("/auth/verify-otp", { email, otp });
            set({ authUser: res.data, otpStep: false });
            toast.success("Signup successful!");
            return true;
        } catch (error) {
            toast.error(error?.response?.data?.message || "OTP verification failed");
            return false;
        } finally {
            set({ isVerifyingOtp: false });
        }
    },

    login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
        return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    }
}))
