import { useEffect, useState } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { SearchIcon, UserPlusIcon, LoaderIcon, BellIcon } from "lucide-react";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import FriendRequestsPanel from "./FriendRequestsPanel";

function ContactList() {
  const { searchUsers, searchResults, isSearching, sendFriendRequest, getMyFriends, friends, isLoadingFriends } = useFriendStore();
  const { setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [query, setQuery] = useState("");
  const [showRequests, setShowRequests] = useState(false);
  const [sentIds, setSentIds] = useState([]);

  useEffect(() => { getMyFriends(); }, [getMyFriends]);
  useEffect(() => {
    const t = setTimeout(() => searchUsers(query), 400);
    return () => clearTimeout(t);
  }, [query, searchUsers]);

  const friendIds = friends.map((f) => f._id);

  const handleSendRequest = async (userId) => {
    await sendFriendRequest(userId);
    setSentIds((prev) => [...prev, userId]);
  };

  return (
    <div className="flex flex-col gap-3 pt-1">

      {/* Search */}
      <div className="relative px-1">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people by name..."
          className="w-full bg-blue-50 border border-blue-100 rounded-xl py-2 pl-9 pr-4 text-sm text-blue-900 placeholder-blue-300 outline-none focus:border-sky-300 focus:bg-white transition"
        />
      </div>

      {/* Friend requests toggle */}
      <button
        onClick={() => setShowRequests((v) => !v)}
        className="flex items-center gap-2 text-xs text-blue-400 hover:text-sky-500 transition px-1"
      >
        <BellIcon className="w-3.5 h-3.5" />
        {showRequests ? "Hide requests" : "View friend requests"}
      </button>

      {showRequests && <FriendRequestsPanel />}

      {/* Search results */}
      {query.length >= 2 ? (
        <div className="space-y-1.5">
          <p className="text-xs text-blue-300 px-1">Search results</p>
          {isSearching ? (
            <div className="flex justify-center py-4">
              <LoaderIcon className="w-5 h-5 animate-spin text-sky-400" />
            </div>
          ) : searchResults.length === 0 ? (
            <p className="text-center text-blue-300 text-sm py-4">No users found</p>
          ) : (
            searchResults.map((user) => {
              const isFriend = friendIds.includes(user._id);
              const isSent = sentIds.includes(user._id);
              return (
                <div key={user._id} className="flex items-center justify-between bg-blue-50 p-3 rounded-xl">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => isFriend && setSelectedUser(user)}>
                    <div className={`avatar ${onlineUsers.includes(user._id) ? "online" : "offline"}`}>
                      <div className="size-10 rounded-full border-2 border-blue-100">
                        <img src={user.profilePic || "/avatar.png"} alt={user.fullName} />
                      </div>
                    </div>
                    <div>
                      <p className="text-blue-900 text-sm font-medium">{user.fullName}</p>
                      <p className="text-blue-400 text-xs">{isFriend ? "Friend · tap to chat" : "Not connected"}</p>
                    </div>
                  </div>
                  {!isFriend && (
                    <button
                      onClick={() => handleSendRequest(user._id)}
                      disabled={isSent}
                      className="p-1.5 bg-sky-100 hover:bg-sky-200 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <UserPlusIcon className="w-4 h-4 text-sky-500" />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="space-y-1.5">
          <p className="text-xs text-blue-300 px-1">Your friends</p>
          {isLoadingFriends ? (
            <UsersLoadingSkeleton />
          ) : friends.length === 0 ? (
            <p className="text-center text-blue-300 text-sm py-6">Search to add people</p>
          ) : (
            friends.map((friend) => (
              <div
                key={friend._id}
                onClick={() => setSelectedUser(friend)}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-blue-50 transition"
              >
                <div className={`avatar ${onlineUsers.includes(friend._id) ? "online" : "offline"}`}>
                  <div className="size-11 rounded-full border-2 border-blue-100">
                    <img src={friend.profilePic || "/avatar.png"} alt={friend.fullName} />
                  </div>
                </div>
                <div>
                  <h4 className="text-blue-900 font-medium text-sm">{friend.fullName}</h4>
                  <p className="text-xs text-blue-400">{onlineUsers.includes(friend._id) ? "Online" : "Offline"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ContactList;