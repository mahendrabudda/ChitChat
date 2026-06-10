import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
            selectedUser?._id === chat._id
              ? "bg-sky-50 border border-sky-100"
              : "hover:bg-blue-50"
          }`}
        >
          <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
            <div className="size-11 rounded-full border-2 border-blue-100">
              <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
            </div>
          </div>
          <div className="min-w-0">
            <h4 className="text-blue-900 font-medium text-sm truncate">{chat.fullName}</h4>
            <p className="text-xs text-blue-400 truncate">
              {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;