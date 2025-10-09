export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Logo container with L-shaped corner brackets */}
        <div className="relative px-4 py-2">
          {/* Top left corner bracket */}
          <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white"></div>
          {/* Top right corner bracket */}
          <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-white"></div>
          {/* Bottom left corner bracket */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-white"></div>
          {/* Bottom right corner bracket */}
          <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white"></div>
          
          {/* Logo text */}
          <div className="text-center">
            <div className="text-lg font-bold text-white tracking-wide">PROFIXION</div>
            <div className="text-xs text-white tracking-wider">FIX.POLISH.SHINE ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
