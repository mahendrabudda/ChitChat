import { useRef, useState } from "react";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import useKeyboardSound from "../hooks/useKeyboardSound";

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) { toast.error("Please select an image"); return; }
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-6 py-4 border-t border-blue-50 bg-white flex-shrink-0">
      {imagePreview && (
        <div className="max-w-3xl mx-auto mb-3">
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-blue-100" />
            <button
              onClick={() => { setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center"
              type="button"
            >
              <XIcon className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSend} className="max-w-3xl mx-auto flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); if (isSoundEnabled) playRandomKeyStrokeSound(); }}
          className="flex-1 bg-blue-50 border border-blue-100 rounded-xl py-2.5 px-4 text-sm text-blue-900 placeholder-blue-300 outline-none focus:border-sky-300 focus:bg-white transition"
          placeholder="Type a message..."
        />
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`px-3 rounded-xl transition border ${imagePreview ? "border-sky-300 bg-sky-50 text-sky-500" : "border-blue-100 bg-blue-50 text-blue-300 hover:text-sky-500 hover:border-sky-200"}`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-4 py-2.5 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;