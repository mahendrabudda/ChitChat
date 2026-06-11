import { ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import welcomeHero from "../assets/WelcomeHero.jpg";
import Navbar from "../components/Navbar";

export default function WelcomePage() {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const handleGetStarted = () => {
    if (authUser) navigate("/home");
    else navigate("/auth");
  };

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 grid lg:grid-cols-2">

        {/* Left */}
        <div className="flex items-center px-6 py-12 lg:px-16 lg:py-0">
          <div className="max-w-xl w-full">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle size={16} />
              Real-Time Communication
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-blue-900">
              Real-Time
              <span className="block text-blue-500">Chat Platform</span>
            </h1>
            <p className="mt-4 text-base lg:text-lg text-blue-400 leading-relaxed">
              Connect instantly with friends, teams, and communities through secure,
              lightning-fast messaging designed for modern communication.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={handleGetStarted}
                className="bg-[#42525A] hover:bg-[#36444b] text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-medium transition flex items-center gap-2 text-sm lg:text-base"
              >
                Get Started <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate("/auth")}
                className="border border-blue-200 hover:bg-blue-50 text-blue-600 px-6 py-3 lg:px-8 lg:py-4 rounded-xl font-medium transition text-sm lg:text-base"
              >
                Sign In
              </button>
            </div>
            <div className="flex gap-8 lg:gap-12 mt-10">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900">10K+</h3>
                <p className="text-xs lg:text-sm text-blue-400">Active Users</p>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900">500K+</h3>
                <p className="text-xs lg:text-sm text-blue-400">Messages Daily</p>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900">99.9%</h3>
                <p className="text-xs lg:text-sm text-blue-400">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right image — hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center p-10">
          <img src={welcomeHero} alt="Real Time Chat" className="w-full max-w-3xl object-contain" />
        </div>

      </div>
    </div>
  );
}