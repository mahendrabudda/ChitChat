import { Mail, MapPin, MessageCircle, Clock, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const socials = [
  {
    icon: <Mail className="size-5 text-sky-500" />,
    label: "Email",
    value: "support@marigo.app",
    href: "mailto:support@marigo.app",
  },
  {
    icon: <ExternalLink className="size-5 text-sky-500" />,
    label: "GitHub",
    value: "github.com/marigo-app",
    href: "https://github.com",
  },
  {
    icon: <ExternalLink className="size-5 text-sky-500" />,
    label: "Twitter / X",
    value: "@marigo_app",
    href: "https://twitter.com",
  },
  {
    icon: <ExternalLink className="size-5 text-sky-500" />,
    label: "LinkedIn",
    value: "linkedin.com/company/marigo",
    href: "https://linkedin.com",
  },
];
export default function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="px-12 lg:px-24 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Get in touch
          </div>
          <h1 className="text-5xl font-bold text-blue-900 leading-tight mb-6">
            We'd love to
            <span className="block text-blue-500">hear from you</span>
          </h1>
          <p className="text-lg text-blue-400 leading-relaxed">
            Have a question, feedback, or just want to say hi? Reach out through 
            any of the channels below — we respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-12 lg:px-24 py-16 border-t border-blue-50">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-blue-50 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all group"
            >
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-100 transition">
                {s.icon}
              </div>
              <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-sm font-semibold text-blue-900">{s.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Location + hours */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-50 to-white border-t border-blue-50">
        <div className="grid lg:grid-cols-2 gap-12">

          <div className="bg-white border border-blue-50 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <MapPin className="size-5 text-sky-500" />
              </div>
              <h3 className="font-semibold text-blue-900 text-lg">Location</h3>
            </div>
            <p className="text-blue-400 leading-relaxed">
              MariGo is a remote-first team based in India. We work across time zones 
              to support our global community of users.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["India", "Remote", "Global"].map((tag) => (
                <span key={tag} className="text-xs bg-sky-50 text-sky-500 border border-sky-100 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-blue-50 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                <MessageCircle className="size-5 text-sky-500" />
              </div>
              <h3 className="font-semibold text-blue-900 text-lg">Support Hours</h3>
            </div>
            <div className="space-y-3">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM IST" },
                { day: "Saturday", hours: "10:00 AM – 2:00 PM IST" },
                { day: "Sunday", hours: "Closed" },
              ].map((row) => (
                <div key={row.day} className="flex justify-between text-sm">
                  <span className="text-blue-900 font-medium">{row.day}</span>
                  <span className="text-blue-400">{row.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-blue-300 mt-5">
              For urgent issues, email us anytime — we monitor 24/7.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-12 lg:px-24 py-16 bg-gradient-to-br from-blue-600 to-sky-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Already a user?</h2>
          <p className="text-blue-100 mb-8 max-w-md mx-auto">
            Jump back into your conversations right now.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition mx-auto"
          >
            Open MariGo
          </button>
        </div>
      </section>
    </div>
  );
}