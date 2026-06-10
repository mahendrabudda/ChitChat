function MessagesLoadingSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"} animate-pulse`}>
          <div className={`h-10 w-40 rounded-2xl ${i % 2 === 0 ? "bg-blue-100" : "bg-sky-100"}`} />
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;