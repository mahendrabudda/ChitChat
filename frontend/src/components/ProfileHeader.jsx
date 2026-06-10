import { useState, useRef } from "react";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-5 border-b border-blue-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <button
              className="size-12 rounded-full overflow-hidden relative group border-2 border-blue-100"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="User"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-[10px] font-medium">Change</span>
              </div>
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          </div>
          <div>
            <h3 className="text-blue-900 font-semibold text-sm max-w-[160px] truncate">
              {authUser?.fullName}
            </h3>
            <p className="text-sky-500 text-xs">● Online</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button
            className="text-blue-300 hover:text-blue-600 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-4" />
          </button>
          <button
            className="text-blue-300 hover:text-blue-600 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
          >
            {isSoundEnabled ? <Volume2Icon className="size-4" /> : <VolumeOffIcon className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;