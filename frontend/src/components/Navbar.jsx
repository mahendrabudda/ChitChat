import { MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { authUser } = useAuthStore();

  const handleGetStarted = () => {
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
    <nav className="flex items-center justify-between px-12 py-6 border-b border-blue-50 bg-white flex-shrink-0">
      <button onClick={() => navigate("/")} className="flex items-center gap-3">
        <div className="bg-[#42525A] p-2 rounded-xl">
          <MessageCircle size={22} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-wide text-blue-900">MariGo</h2>
          <p className="text-[10px] tracking-wider text-blue-400 uppercase">Real-Time Chat</p>
        </div>
      </button>
      <div className="hidden md:flex items-center gap-10">
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
          className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}