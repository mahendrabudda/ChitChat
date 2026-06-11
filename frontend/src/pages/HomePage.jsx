import { useChatStore } from "../store/useChatStore";
import { MessageCircle } from "lucide-react";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import backgroundImg from "../assets/BackGround.jpg";

function HomePage() {
  const { selectedUser, activeTab, setSelectedUser } = useChatStore();

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 lg:px-12 py-4 border-b border-blue-50 flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <MessageCircle size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-bold tracking-wide text-blue-900">MariGo</h2>
            <p className="text-[9px] tracking-wider text-blue-400 uppercase">Real-Time Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-blue-400 hidden md:block">
            Real-time • Secure • Fast
          </span>
          <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* SIDEBAR — full screen on mobile when no chat selected */}
        <div className={`
          flex-col border-r border-blue-50 bg-white
          ${selectedUser
            ? "hidden lg:flex lg:w-80 lg:flex-shrink-0"
            : "flex w-full lg:w-80 lg:flex-shrink-0"
          }
        `}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* CHAT PANEL — full screen on mobile when chat selected */}
        <div
          className={`
            flex-col min-w-0
            ${selectedUser ? "flex w-full" : "hidden lg:flex lg:flex-1"}
          `}
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </div>
    </div>
  );
}

export default HomePage;