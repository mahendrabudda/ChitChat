import { MessageCircle, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setMenuOpen(false);
    if (authUser) navigate("/home");
    else navigate("/auth");
  };

  const links = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Features", path: "/features" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="flex flex-col border-b border-blue-50 bg-white flex-shrink-0">
      <div className="flex items-center justify-between px-6 lg:px-12 py-5">
        <button onClick={() => navigate("/")} className="flex items-center gap-3">
          <div className="bg-[#42525A] p-2 rounded-xl">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-wide text-blue-900">MariGo</h2>
            <p className="text-[10px] tracking-wider text-blue-400 uppercase">Real-Time Chat</p>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`text-sm font-medium transition ${
                location.pathname === link.path
                  ? "text-blue-900 font-semibold"
                  : "text-blue-500 hover:text-blue-800"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleGetStarted}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl font-medium transition text-sm"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-blue-600 p-1"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 gap-3 border-t border-blue-50">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className={`text-sm font-medium text-left py-2 transition ${
                location.pathname === link.path
                  ? "text-blue-900 font-semibold"
                  : "text-blue-500"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={handleGetStarted}
            className="bg-sky-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm w-full"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}