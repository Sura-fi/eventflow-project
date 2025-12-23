import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Import the icons we need
import { Sun, Moon, LogOut, Settings, Sparkles } from "lucide-react";



export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  
  useEffect(() => {
    const root = window.document.documentElement; // This selects the <html> tag
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]); // This ensures it runs EVERY time the button is clicked

  // 2. Logout Logic
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const linkClass = (path) =>
    `px-4 py-2 rounded-xl font-medium transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white shadow"
        : "text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-slate-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/events" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-100 to-violet-400 bg-clip-text text-transparent tracking-tight">
            EventFlow
          </span>
        </Link>

        {/* Right Side Tools */}
        <div className="flex items-center gap-3">
          
          {/* Main Links (Hidden on small screens if you want, or keep them) */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            <Link to="/events" className={linkClass("/events")}>Events</Link>
            <Link to="/my-registrations" className={linkClass("/my-registrations")}>My Registrations</Link>
          </div>

          {/* Dark Mode Toggle */}
          <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 transition-all">
         {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
         </button>

          {/* User Profile Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-1 pr-3 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-slate-200">Account</span>
            </button>

            {/* Dropdown Menu - Opens on Hover */}
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
              <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl">
                <Settings className="w-4 h-4" /> Dashboard
              </Link>
              <hr className="my-1 border-gray-100 dark:border-slate-800" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}