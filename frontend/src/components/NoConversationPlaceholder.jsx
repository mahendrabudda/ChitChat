import { MessageCircle } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-blue-50/30 to-white text-center p-6">
      <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
        <MessageCircle className="size-8 text-sky-400" />
      </div>
      <h3 className="text-lg font-semibold text-blue-900 mb-2">Select a conversation</h3>
      <p className="text-blue-400 text-sm max-w-xs leading-relaxed">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
}

export default NoConversationPlaceholder;