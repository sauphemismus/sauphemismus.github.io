const Loader = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex flex-col justify-center items-center min-h-[200px] gap-4">
      {/* Main spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="text-white/80 text-sm font-medium animate-pulse">
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Generiere kreativen Text...
        </span>
      </div>
      
      {/* Floating dots */}
      <div className="flex gap-2 mt-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
    </div>
  );
};

export default Loader;
