import { XIcon, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setSelectedUser(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center px-4 lg:px-6 py-4 border-b border-blue-50 flex-shrink-0 bg-white">
      <div className="flex items-center gap-3">
        {/* mobile back arrow */}
        <button
          onClick={() => setSelectedUser(null)}
          className="lg:hidden text-blue-400 hover:text-blue-600 transition p-1"
        >
          <ArrowLeft size={20} />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 rounded-full border-2 border-blue-100">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="text-blue-900 font-semibold text-sm">{selectedUser.fullName}</h3>
          <p className={`text-xs ${isOnline ? "text-sky-500" : "text-blue-300"}`}>
            {isOnline ? "● Online" : "○ Offline"}
          </p>
        </div>
      </div>

      {/* desktop X — hidden on mobile */}
      <button
        onClick={() => setSelectedUser(null)}
        className="hidden lg:block text-blue-300 hover:text-blue-600 transition-colors p-1 rounded-lg hover:bg-blue-50"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

export default ChatHeader;