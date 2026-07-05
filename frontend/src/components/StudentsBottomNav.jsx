import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertCircle,
  Star,
  Users,
  User,
} from "lucide-react";

const navItems = [
{ label: "Home", icon: LayoutDashboard, path: "/student-dashboard" },
{ label: "Complaints", icon: AlertCircle, path: "/student-dashboard/complaints" },
{ label: "Feedback", icon: Star, path: "/student-dashboard/feedback" },
{ label: "Match", icon: Users, path: "/student-dashboard/roommate" },
{ label: "Profile", icon: User, path: "/student-dashboard/profile" },
];
const StudentsBottomNav = () =>{
     const navigate = useNavigate();
  const location = useLocation();

    return(
         <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1A2F42] border-t border-gray-100 dark:border-gray-700 lg:hidden z-40">
      <div className="flex items-center justify-around">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors ${
                isActive
                  ? "text-[#083067] dark:text-white bg-[#eff4ff] dark:bg-blue-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#083067] dark:hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>

    );
}
export default StudentsBottomNav;
