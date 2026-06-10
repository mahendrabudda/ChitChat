import { useEffect } from "react";
import { useFriendStore } from "../store/useFriendStore";
import { CheckIcon, XIcon } from "lucide-react";

function FriendRequestsPanel() {
  const { incomingRequests, getIncomingRequests, respondToRequest, isLoadingRequests } = useFriendStore();

  useEffect(() => { getIncomingRequests(); }, [getIncomingRequests]);

  if (isLoadingRequests)
    return <p className="text-blue-300 text-xs text-center py-3">Loading...</p>;

  if (incomingRequests.length === 0)
    return <p className="text-blue-300 text-xs text-center py-3">No pending requests</p>;

  return (
    <div className="space-y-1.5">
      {incomingRequests.map((req) => (
        <div key={req._id} className="flex items-center justify-between bg-sky-50 border border-sky-100 p-3 rounded-xl">
          <div className="flex items-center gap-2">
            <img src={req.sender.profilePic || "/avatar.png"} className="w-9 h-9 rounded-full border-2 border-blue-100 object-cover" alt={req.sender.fullName} />
            <span className="text-blue-900 text-sm font-medium">{req.sender.fullName}</span>
          </div>
          <div className="flex gap-1.5">
            <button onClick={() => respondToRequest(req._id, "accepted")} className="p-1.5 bg-sky-100 hover:bg-sky-200 rounded-lg transition">
              <CheckIcon className="w-3.5 h-3.5 text-sky-500" />
            </button>
            <button onClick={() => respondToRequest(req._id, "rejected")} className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition">
              <XIcon className="w-3.5 h-3.5 text-red-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendRequestsPanel;