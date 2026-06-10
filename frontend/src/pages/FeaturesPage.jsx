import { useNavigate } from "react-router-dom";
import {
  MessageCircle, Zap, Shield, Image, Bell, Users,
  Smile, Search, ArrowRight, CheckCircle
} from "lucide-react";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <Zap className="size-7 text-sky-500" />,
    title: "Real-Time Messaging",
    desc: "Messages are delivered instantly using WebSocket technology. No refresh needed — conversations flow naturally.",
    badge: "Core",
  },
  {
    icon: <Shield className="size-7 text-sky-500" />,
    title: "Secure Authentication",
    desc: "JWT-based auth with cookie sessions, Google OAuth, and OTP-based password reset for complete account security.",
    badge: "Security",
  },
  {
    icon: <Image className="size-7 text-sky-500" />,
    title: "Image Sharing",
    desc: "Send photos directly in chat. Images are uploaded to Cloudinary and delivered instantly to your contact.",
    badge: "Media",
  },
  {
    icon: <Users className="size-7 text-sky-500" />,
    title: "Friend Requests",
    desc: "Search for people by name, send a friend request, and start chatting once accepted — just like social media.",
    badge: "Social",
  },
  {
    icon: <Bell className="size-7 text-sky-500" />,
    title: "Sound Notifications",
    desc: "Get audio alerts for new messages. Toggle sounds on or off at any time from your profile header.",
    badge: "UX",
  },
  {
    icon: <CheckCircle className="size-7 text-sky-500" />,
    title: "Online Presence",
    desc: "See who's online in real time. The sidebar shows live online/offline status for all your contacts.",
    badge: "Real-Time",
  },
  {
    icon: <Search className="size-7 text-sky-500" />,
    title: "Contact Search",
    desc: "Find anyone on MariGo by searching their name. Results appear instantly as you type.",
    badge: "Discovery",
  },
  {
    icon: <Smile className="size-7 text-sky-500" />,
    title: "Profile Customisation",
    desc: "Upload a profile picture, update your display name, and personalise your presence on the platform.",
    badge: "Profile",
  },
  {
    icon: <MessageCircle className="size-7 text-sky-500" />,
    title: "Chat History",
    desc: "All your conversations are saved and loaded instantly when you open a chat. Never lose a message.",
    badge: "Storage",
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="px-12 lg:px-24 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Everything you need
          </div>
          <h1 className="text-5xl font-bold text-blue-900 leading-tight mb-6">
            Packed with features,
            <span className="block text-blue-500">simple by design</span>
          </h1>
          <p className="text-lg text-blue-400 leading-relaxed">
            MariGo comes with everything you need for modern real-time communication — 
            built clean so it never gets in your way.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="px-12 lg:px-24 py-16 border-t border-blue-50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                  {f.icon}
                </div>
                <span className="text-[10px] font-semibold text-sky-500 bg-sky-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {f.badge}
                </span>
              </div>
              <h3 className="font-semibold text-blue-900 text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-blue-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison strip */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-50 to-white border-t border-blue-50">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why choose MariGo?</h2>
          <p className="text-blue-400">Everything in one place. No bloat, no noise.</p>
        </div>
        <div className="max-w-xl mx-auto space-y-3">
          {[
            "No ads. Ever.",
            "No phone number required",
            "Open friend discovery by name",
            "Images delivered via CDN — always fast",
            "Password reset via email OTP",
            "Google sign-in supported",
            "Sound notifications you can toggle",
            "Works on any modern browser",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white border border-blue-50 rounded-xl px-5 py-3 shadow-sm">
              <CheckCircle className="size-4 text-sky-500 flex-shrink-0" />
              <span className="text-sm text-blue-900 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-600 to-sky-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Try all features free</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Sign up in seconds. No credit card required.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition flex items-center gap-2 mx-auto"
          >
            Create Free Account <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}