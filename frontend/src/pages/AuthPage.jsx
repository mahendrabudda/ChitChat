import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Loader, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

import loginHero from "../assets/LoginHero.jpg";
import signUpHero from "../assets/SignUpHero.jpg";

const PANEL = { LOGIN: "login", SIGNUP: "signup", FORGOT: "forgot" };

export default function AuthPage() {
  const [panel, setPanel] = useState(PANEL.LOGIN);
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [forgotNewPassword, setForgotNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const { login, signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const switchPanel = (to) => { setError(""); setPanel(to); };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(loginData);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup({
        fullName: signupData.fullName,
        email: signupData.email,
        password: signupData.password,
      });
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setForgotLoading(true);
    try {
      const res = await axiosInstance.post("/auth/send-reset-otp", { email: forgotEmail });
      if (res.data.success) {
        toast.success(res.data.message);
        setForgotStep(2);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setForgotLoading(true);
    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        email: forgotEmail,
        otp: forgotOtp,
        newPassword: forgotNewPassword,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setForgotStep(1);
        setForgotEmail("");
        setForgotOtp("");
        setForgotNewPassword("");
        switchPanel(PANEL.LOGIN);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setForgotLoading(false);
    }
  };

  const inputClass = "w-full bg-white rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-slate-100 outline-none text-sm";
  const inputClassNoIcon = "w-full bg-white rounded-xl border border-slate-200 py-2.5 px-4 focus:ring-2 focus:ring-slate-100 outline-none text-sm";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400";

  const Logo = () => (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex flex-col">
        <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-slate-700 rotate-45" />
        <div className="w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-slate-700 rotate-45 -mt-[7px]" />
      </div>
      <div>
        <h2 className="text-sm font-bold tracking-wide text-slate-800">MariGo</h2>
        <p className="text-[9px] tracking-wider text-slate-500 uppercase">Real Time Chat Application</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 p-4">
      <div className="w-full max-w-[900px] min-h-[580px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">

          {/* ══ LOGIN ══ */}
          {panel === PANEL.LOGIN && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 min-h-[580px]"
            >
              {/* Hero — hidden on mobile */}
              <div className="hidden md:block h-full">
                <img src={loginHero} alt="Login" className="w-full h-full object-cover" />
              </div>

              {/* Form */}
              <div className="flex items-center justify-center px-8 py-8 md:py-0 h-full">
                <div className="w-full">
                  <Logo />
                  <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
                  <p className="text-sm text-slate-500 mt-0.5 mb-4">Enter your credentials to access your dashboard.</p>

                  {error && (
                    <div className="mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">{error}</div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-3">
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-700">Email</label>
                      <div className="relative">
                        <Mail size={15} className={iconClass} />
                        <input type="email" placeholder="mail@example.com" value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-700">Password</label>
                      <div className="relative">
                        <Lock size={15} className={iconClass} />
                        <input type="password" placeholder="Enter password" value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className={inputClass} />
                      </div>
                      <div className="flex justify-end mt-1">
                        <button type="button" onClick={() => switchPanel(PANEL.FORGOT)}
                          className="text-xs text-slate-400 hover:text-slate-700 transition">
                          Forgot password?
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-[#42525A] text-white py-2.5 rounded-xl hover:bg-[#36444b] transition flex items-center justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? <Loader size={16} className="animate-spin" /> : "Continue"}
                    </button>
                  </form>

                  <div className="flex items-center my-3">
                    <div className="flex-1 border-t border-slate-200" />
                    <span className="px-3 text-xs text-slate-400">OR</span>
                    <div className="flex-1 border-t border-slate-200" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        import.meta.env.MODE === "development"
                          ? "http://localhost:3000/api/auth/google"
                          : "/api/auth/google";
                    }}
                    className="w-full border border-slate-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FcGoogle size={18} />
                    Continue with Google
                  </button>

                  <p className="text-center mt-4 text-sm text-slate-500">
                    Don't have an account?{" "}
                    <button onClick={() => switchPanel(PANEL.SIGNUP)} className="font-semibold text-slate-800 underline">
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ══ SIGNUP ══ */}
          {panel === PANEL.SIGNUP && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 150 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 min-h-[580px]"
            >
              {/* Form */}
              <div className="flex items-start justify-center px-8 h-full pt-10 pb-8 md:pb-0">
                <div className="w-full">
                  <Logo />
                  <h1 className="text-2xl font-bold text-slate-800">Create Account</h1>
                  <p className="text-sm text-slate-500 mt-0.5 mb-6">Join and Chat with Your Loved Ones.</p>

                  {error && (
                    <div className="mb-4 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">{error}</div>
                  )}

                  <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-700">Full Name</label>
                      <div className="relative">
                        <User size={15} className={iconClass} />
                        <input type="text" placeholder="John Doe" value={signupData.fullName}
                          onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-700">Email</label>
                      <div className="relative">
                        <Mail size={15} className={iconClass} />
                        <input type="email" placeholder="mail@example.com" value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-xs font-semibold text-slate-700">Password</label>
                      <div className="relative">
                        <Lock size={15} className={iconClass} />
                        <input type="password" placeholder="Create a password" value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} className={inputClass} />
                      </div>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-[#42525A] text-white py-2.5 rounded-xl hover:bg-[#36444b] transition flex items-center justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? <Loader size={16} className="animate-spin" /> : "Create Account"}
                    </button>
                  </form>

                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-slate-200" />
                    <span className="px-3 text-xs text-slate-400">OR</span>
                    <div className="flex-1 border-t border-slate-200" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      window.location.href =
                        import.meta.env.MODE === "development"
                          ? "http://localhost:3000/api/auth/google"
                          : "/api/auth/google";
                    }}
                    className="w-full border border-slate-200 rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    <FcGoogle size={18} />
                    Sign up with Google
                  </button>

                  <p className="text-center mt-4 text-sm text-slate-500">
                    Already have an account?{" "}
                    <button onClick={() => switchPanel(PANEL.LOGIN)} className="font-semibold text-slate-800 underline">
                      Sign In
                    </button>
                  </p>
                </div>
              </div>

              {/* Hero — hidden on mobile */}
              <div className="hidden md:block h-full">
                <img src={signUpHero} alt="Signup" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}

          {/* ══ FORGOT PASSWORD ══ */}
          {panel === PANEL.FORGOT && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -150 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 min-h-[580px]"
            >
              {/* Hero — hidden on mobile */}
              <div className="hidden md:block h-full">
                <img src={loginHero} alt="Reset" className="w-full h-full object-cover" />
              </div>

              {/* Form */}
              <div className="flex items-center justify-center px-8 py-8 md:py-0 h-full">
                <div className="w-full">
                  <Logo />

                  <button
                    onClick={() => { switchPanel(PANEL.LOGIN); setForgotStep(1); }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition mb-3"
                  >
                    <ArrowLeft size={13} /> Back to login
                  </button>

                  <h1 className="text-2xl font-bold text-slate-800">
                    {forgotStep === 1 ? "Forgot Password" : "Reset Password"}
                  </h1>
                  <p className="text-sm text-slate-500 mt-0.5 mb-4">
                    {forgotStep === 1
                      ? "Enter your email and we'll send you an OTP."
                      : `OTP sent to ${forgotEmail}. Enter it below.`}
                  </p>

                  {error && (
                    <div className="mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">{error}</div>
                  )}

                  {forgotStep === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div>
                        <label className="block mb-1 text-xs font-semibold text-slate-700">Email</label>
                        <div className="relative">
                          <Mail size={15} className={iconClass} />
                          <input type="email" placeholder="mail@example.com" value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)} required className={inputClass} />
                        </div>
                      </div>
                      <button type="submit" disabled={forgotLoading}
                        className="w-full bg-[#42525A] text-white py-2.5 rounded-xl hover:bg-[#36444b] transition flex items-center justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                        {forgotLoading ? <Loader size={16} className="animate-spin" /> : "Send OTP"}
                      </button>
                    </form>
                  )}

                  {forgotStep === 2 && (
                    <form onSubmit={handleResetPassword} className="space-y-3">
                      <div>
                        <label className="block mb-1 text-xs font-semibold text-slate-700">OTP</label>
                        <input type="text" placeholder="Enter 6-digit OTP" value={forgotOtp}
                          onChange={(e) => setForgotOtp(e.target.value)} required maxLength={6}
                          className={inputClassNoIcon} />
                      </div>
                      <div>
                        <label className="block mb-1 text-xs font-semibold text-slate-700">New Password</label>
                        <div className="relative">
                          <Lock size={15} className={iconClass} />
                          <input type="password" placeholder="Create new password" value={forgotNewPassword}
                            onChange={(e) => setForgotNewPassword(e.target.value)} required className={inputClass} />
                        </div>
                      </div>
                      <button type="submit" disabled={forgotLoading}
                        className="w-full bg-[#42525A] text-white py-2.5 rounded-xl hover:bg-[#36444b] transition flex items-center justify-center text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                        {forgotLoading ? <Loader size={16} className="animate-spin" /> : "Reset Password"}
                      </button>
                      <button type="button" onClick={() => { setForgotStep(1); setError(""); }}
                        className="w-full text-xs text-slate-400 hover:text-slate-700 transition mt-1">
                        Didn't receive OTP? Resend
                      </button>
                    </form>
                  )}

                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}