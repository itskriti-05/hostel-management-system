import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const WardenHeader = () => {
    const { user } = useAuth();
      const navigate = useNavigate();
  return (
        <>
       <header className="bg-white dark:bg-[#1A2F42] border-b border-gray-100 dark:border-gray-700 px-6 py-3 flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="text-[10px] sm:text-xs font-semibold text-[#083067] dark:text-white">
              {user?.email?.split("@")[0]}
            </p>
            <p className="text-[10px] text-gray-400">Warden</p>
          </div>
          <button
            onClick={() => navigate("/warden-dashboard/profile")}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-[#083067] flex items-center justify-center text-white font-bold text-sm"
          >
            {user?.email?.charAt(0).toUpperCase()}
          </button>
        </header>
        </>
  )
}

export default WardenHeader