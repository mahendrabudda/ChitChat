import { useNavigate } from "react-router-dom";
import { ArrowRight, Shield, Zap, Heart, Users } from "lucide-react";
import Navbar from "../components/Navbar";

const values = [
  {
    icon: <Shield className="size-6 text-sky-500" />,
    title: "Privacy First",
    desc: "Your conversations are yours. We never read, sell, or share your messages with anyone.",
  },
  {
    icon: <Zap className="size-6 text-sky-500" />,
    title: "Lightning Fast",
    desc: "Messages delivered in milliseconds. No lag, no delay — just instant communication.",
  },
  {
    icon: <Heart className="size-6 text-sky-500" />,
    title: "Built with Care",
    desc: "Every detail is designed to make your experience feel effortless and enjoyable.",
  },
  {
    icon: <Users className="size-6 text-sky-500" />,
    title: "Community Driven",
    desc: "Built by people who believe real connection matters in a digital world.",
  },
];

const team = [
  { name: "Mahendra", role: "Founder & CEO", initials: "AM" },
  { name: "Mahi", role: "Lead Designer", initials: "PS" },
  { name: "Mahendra Bahubali", role: "Backend Engineer", initials: "RK" },
  { name: "Bob", role: "Frontend Engineer", initials: "SP" },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="px-12 lg:px-24 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Story
          </div>
          <h1 className="text-5xl font-bold text-blue-900 leading-tight mb-6">
            We're building the future of
            <span className="block text-blue-500">real-time communication</span>
          </h1>
          <p className="text-lg text-blue-400 leading-relaxed max-w-2xl">
            MariGo was born out of a simple frustration — existing chat apps were either too complex, 
            too slow, or too invasive. We set out to build something different: fast, clean, and human.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="px-12 lg:px-24 py-16 border-t border-blue-50">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Mission</h2>
            <p className="text-blue-400 leading-relaxed mb-4">
              To make meaningful digital communication accessible to everyone — regardless of 
              location, device, or technical expertise.
            </p>
            <p className="text-blue-400 leading-relaxed">
              We believe the best technology disappears into the background, letting real 
              human connections take centre stage. That's what MariGo is built to do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-blue-900">10K+</h3>
              <p className="text-sm text-blue-400 mt-1">Active Users</p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-blue-900">500K+</h3>
              <p className="text-sm text-blue-400 mt-1">Messages Daily</p>
            </div>
            <div className="bg-sky-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-blue-900">99.9%</h3>
              <p className="text-sm text-blue-400 mt-1">Uptime</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h3 className="text-4xl font-bold text-blue-900">2024</h3>
              <p className="text-sm text-blue-400 mt-1">Founded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-50 to-white border-t border-blue-50">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">What we stand for</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">{v.title}</h3>
              <p className="text-sm text-blue-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="px-12 lg:px-24 py-16 border-t border-blue-50">
        <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">The team behind MariGo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-white font-bold text-xl">{member.initials}</span>
              </div>
              <h4 className="font-semibold text-blue-900">{member.name}</h4>
              <p className="text-sm text-blue-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-600 to-sky-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to start chatting?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Join thousands of users already connecting on MariGo.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition flex items-center gap-2 mx-auto"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}