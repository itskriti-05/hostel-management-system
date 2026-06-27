import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import WardenSidebar from "./WardenSidebar";

export default function WardenDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f8f9ff] dark:bg-[#0F1F2E] transition-colors duration-300">
      <WardenSidebar />
      <div className="flex-1 ml-56 flex flex-col">
        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}