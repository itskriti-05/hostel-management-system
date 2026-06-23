import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle, Star, UtensilsCrossed,
  Users, ChevronRight
} from "lucide-react";
import api from "../../api/axios";

export default function Overview() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchProfile(), fetchMenu(), fetchComplaints()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    const res = await api.get("/api/student/profile");
    setProfile(res.data);
  };

  const fetchMenu = async () => {
    const res = await api.get("/api/menu");
    if (res.data.length > 0) {
      const today = new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      setMenuData({ day: today, meals: res.data[0].meals[today] });
    }
  };

  const fetchComplaints = async () => {
    const res = await api.get("/api/complaint/my");
    setComplaints(res.data);
  };

  const pendingCount = complaints.filter(c => c.status === "PENDING").length;
  const resolvedCount = complaints.filter(c => c.status === "RESOLVED").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen">
        <div className="text-[#1B3C53] dark:text-white font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Good day, {profile?.name || user?.email?.split('@')[0]}! 👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening in your hostel today.
        </p>
      </div>

      {/* Profile incomplete banner */}
      {profile && !profile.profileComplete && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              Complete Your Profile
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Fill in your details to unlock all hostel services.
            </p>
          </div>
          <button
            onClick={() => navigate("/student-dashboard/profile")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-colors flex-shrink-0"
          >
            Complete Now
          </button>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<AlertCircle className="w-5 h-5 text-red-400" />}
          label="Pending Complaints"
          value={pendingCount}
          bg="bg-red-50 dark:bg-red-900/20"
          onClick={() => navigate("/student-dashboard/complaints")}
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5 text-green-400" />}
          label="Resolved Complaints"
          value={resolvedCount}
          bg="bg-green-50 dark:bg-green-900/20"
          onClick={() => navigate("/student-dashboard/complaints")}
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-blue-400" />}
          label="Roommate Match"
          value="View"
          bg="bg-blue-50 dark:bg-blue-900/20"
          onClick={() => navigate("/student-dashboard/roommate")}
        />
      </div>

      {/* Today's Mess Menu */}
      <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-[#1B3C53] dark:text-white" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              Today's Mess Menu
            </h2>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-[#162636] px-3 py-1 rounded-full">
            {menuData?.day || "Today"}
          </span>
        </div>

        {menuData?.meals ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MealCard title="Breakfast" icon="🍳" items={menuData.meals.BREAKFAST} bg="bg-[#EBF4FF] dark:bg-[#162636]" />
            <MealCard title="Lunch" icon="🍛" items={menuData.meals.LUNCH} bg="bg-[#F0FDF4] dark:bg-green-900/20" />
            <MealCard title="Snacks" icon="🍪" items={menuData.meals.SNACKS} bg="bg-[#FFFBEB] dark:bg-yellow-900/20" />
            <MealCard title="Dinner" icon="🍽️" items={menuData.meals.DINNER} bg="bg-[#FDF4FF] dark:bg-purple-900/20" />
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 dark:text-gray-500">
            <UtensilsCrossed className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No menu available for today</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionCard
          icon={<AlertCircle className="w-5 h-5 text-red-400" />}
          title="File a Complaint"
          description="Report maintenance issues or raise concerns with hostel management."
          buttonText="Go to Complaints"
          buttonColor="bg-red-500 hover:bg-red-600"
          onClick={() => navigate("/student-dashboard/complaints")}
        />
        <ActionCard
          icon={<Star className="w-5 h-5 text-yellow-400" />}
          title="Rate Today's Meal"
          description="Share your feedback on today's mess food to help us improve."
          buttonText="Give Feedback"
          buttonColor="bg-yellow-500 hover:bg-yellow-600"
          onClick={() => navigate("/student-dashboard/feedback")}
        />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`${bg} rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow flex items-center justify-between`}
    >
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  );
}

function MealCard({ title, icon, items, bg }) {
  return (
    <div className={`${bg} rounded-xl p-4`}>
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{title}</h4>
      <div className="space-y-1">
        {items && items.length > 0 ? (
          items.slice(0, 3).map((item, i) => (
            <p key={i} className="text-xs text-gray-600 dark:text-gray-300">{item}</p>
          ))
        ) : (
          <p className="text-xs text-gray-400">Not available</p>
        )}
      </div>
    </div>
  );
}

function ActionCard({ icon, title, description, buttonText, buttonColor, onClick }) {
  return (
    <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-gray-50 dark:bg-[#162636] rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className={`w-full py-2.5 ${buttonColor} text-white text-sm font-semibold rounded-xl transition-colors`}
      >
        {buttonText}
      </button>
    </div>
  );
}