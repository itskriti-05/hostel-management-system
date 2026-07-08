import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, AlertCircle, Star,
  UserPlus, User, LogOut, Sun, Moon, Heart
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/warden-dashboard" },
  { label: "Students", icon: Users, path: "/warden-dashboard/students" },
  { label: "Complaints", icon: AlertCircle, path: "/warden-dashboard/complaints" },
  { label: "Feedback", icon: Star, path: "/warden-dashboard/feedback" },
  { label: "Roommate Match", icon: Users, path: "/warden-dashboard/matches" },
  { label: "Add Staff", icon: UserPlus, path: "/warden-dashboard/staff" },
  { label: "Profile", icon: User, path: "/warden-dashboard/profile" },
];

const WardenSidebar = () => {
   const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () =>{
     logout();
    navigate("/login");
  }
  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white dark:bg-[#1A2F42] flex flex-col z-40 border-r border-gray-100 dark:border-gray-700">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-700">
        <span className="text-lg font-bold text-[#083067] dark:text-white">
          Hostel<span className="text-blue-400">Ezz</span>
        </span>
        <p className="text-[10px] text-gray-400 mt-0.5">Warden Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[10px] sm:text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[#083067] text-white"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#162636] hover:text-[#083067] dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-700 space-y-0.5">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#162636] transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[10px] sm:text-xs font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </aside>
  )
}

export default WardenSidebar