import { MessageCircle } from "lucide-react";

function NoChatHistoryPlaceholder({ name }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-14 h-14 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
        <MessageCircle className="size-7 text-sky-400" />
      </div>
      <h3 className="text-base font-semibold text-blue-900 mb-2">Start chatting with {name}</h3>
      <p className="text-blue-400 text-sm mb-5">Say something to kick things off.</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?"].map((q) => (
          <button key={q} className="px-4 py-2 text-xs font-medium text-sky-500 bg-sky-50 border border-sky-100 rounded-full hover:bg-sky-100 transition">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;