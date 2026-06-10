import { MessageCircle } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 gap-3">
      <div className="bg-[#42525A] p-3 rounded-xl animate-pulse">
        <MessageCircle className="size-7 text-white" />
      </div>
      <p className="text-blue-400 text-sm tracking-wide">Loading...</p>
    </div>
  );
}

export default PageLoader;