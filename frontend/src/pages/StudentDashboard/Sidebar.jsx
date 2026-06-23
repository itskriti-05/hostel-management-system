import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
  UtensilsCrossed,
  AlertCircle,
  Settings,
  LogOut,
  Sun,
  Moon,
  Users,
  User,
  Star

} from "lucide-react";


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/student-dashboard" },
  { label: "Complaints", icon: AlertCircle, path: "/student-dashboard/complaints" },
  { label: "Feedback", icon: Star, path: "/student-dashboard/feedback" },
  { label: "Preferences", icon: Settings, path: "/student-dashboard/preferences" },
  { label: "Roommate Match", icon: Users, path: "/student-dashboard/roommate" },
  { label: "Profile", icon: User, path: "/student-dashboard/profile" },
];

const SideBar = () => {
const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
     <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#1A2F42] shadow-lg flex flex-col z-40 transition-colors duration-300 rounded-r-3xl">
      {/* Logo */}
    {/* Logo */}
<div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700">
  <div className="flex items-center gap-2">
    <img src="/logo.jpg" alt="logo" className="w-8 h-8 object-contain" />
   <span className="text-xl font-bold text-[#1B3C53] dark:text-white">
  Hostel<span className="text-blue-500">Ezz</span>
</span>
  </div>
</div>

{/* User info - avatar + name + role badge */}
<div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-[#1B3C53] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
      {user?.email?.charAt(0).toUpperCase()}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[140px]">
       {user?.email?.split('@')[0]}
      </p>
      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
        Student
      </span>
    </div>
  </div>
</div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#DBEAFE] dark:bg-[#162636] text-[#1B3C53] dark:text-white"
                  : "text-gray-400 dark:text-gray-400 hover:bg-[#F0F6FF] dark:hover:bg-[#162636]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-gray-100 dark:border-gray-700 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-[#F0F6FF] dark:hover:bg-[#162636] transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  )
}

export default SideBar