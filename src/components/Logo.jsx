export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <img 
        src="/logo.png" 
        alt="Profixion Logo" 
        className="h-16 md:h-20 lg:h-24 w-auto"
      />
    </div>
  )
}
