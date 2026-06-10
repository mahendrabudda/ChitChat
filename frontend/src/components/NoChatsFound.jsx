import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
      <div className="w-12 h-12 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center">
        <MessageCircle className="w-6 h-6 text-sky-400" />
      </div>
      <div>
        <h4 className="text-blue-900 font-medium text-sm mb-1">No conversations yet</h4>
        <p className="text-blue-400 text-xs px-4">Add contacts and start chatting</p>
      </div>
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-xs font-medium text-sky-500 bg-sky-50 border border-sky-100 rounded-xl hover:bg-sky-100 transition"
      >
        Find contacts
      </button>
    </div>
  );
}

export default NoChatsFound;