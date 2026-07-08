import { useState, useEffect } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  Users, AlertCircle, Star, UserCheck,
  Calendar, Hash, ChevronRight
} from "lucide-react";
import { User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import WardenHeader from "../../components/WardenHeader";

function StatCard({ icon: Icon, iconBg, value, label, badge, badgeColor, sub }) {
  return (
    <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-[#083067] dark:text-white" />
        </div>
        {badge && (
          <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-[#083067] dark:text-white mb-0.5">
        {value}
      </div>
      {sub && <p className="text-[10px] text-blue-400 font-medium mb-0.5">{sub}</p>}
      <p className="text-[10px] sm:text-xs text-gray-400">{label}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    PENDING: { label: "Filed", color: "bg-amber-50 text-amber-600" },
    IN_PROGRESS: { label: "In Progress", color: "bg-blue-50 text-blue-500" },
    RESOLVED: { label: "Resolved", color: "bg-emerald-50 text-emerald-600" },
  };
  const s = map[status] || map.PENDING;
  return (
    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${s.color}`}>
      • {s.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const map = {
    HIGH: { label: "HIGH", color: "bg-red-50 text-red-500" },
    MEDIUM: { label: "MEDIUM", color: "bg-amber-50 text-amber-500" },
    LOW: { label: "LOW", color: "bg-gray-100 text-gray-500" },
  };
  const p = map[priority] || map.LOW;
  return (
    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${p.color}`}>
      {p.label}
    </span>
  );
}

export default function WardenOverview() {
    const {user }= useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingComplaints: 0,
    averageRating: 0,
    newToday: 0,
  });
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [studentsRes, complaintsRes, feedbackRes] = await Promise.all([
        api.get("/api/warden/all-students"),
        api.get("/api/complaint"),
        api.get("/api/feedback"),
      ]);

      const studentsData = studentsRes.data;
      const complaintsData = complaintsRes.data;
      const feedbackData = feedbackRes.data;

      setStudents(studentsData.slice(0, 4));
      setComplaints(complaintsData.slice(0, 4));

      const avgRating = feedbackData.length
        ? (feedbackData.reduce((s, f) => s + f.rating, 0) / feedbackData.length).toFixed(1)
        : "0.0";

      const today = new Date().toDateString();
      const newToday = studentsData.filter(
        s => new Date(s.date).toDateString() === today
      ).length;

      setStats({
        totalStudents: studentsData.length,
        pendingComplaints: complaintsData.filter(c => c.status === "PENDING").length,
        averageRating: avgRating,
        newToday,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#083067] dark:text-white font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <>
        <WardenHeader/>
    <div className="p-6 bg-[#f8f9ff] dark:bg-[#0F1F2E] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[#083067] dark:text-white">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long", year: "numeric",
            month: "long", day: "numeric",
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Users}
          iconBg="bg-[#d5e3ff] dark:bg-blue-900/20"
          value={stats.totalStudents}
          label="Total Students"
          sub="+2.4%"
        />
        <StatCard
          icon={AlertCircle}
          iconBg="bg-[#ffddb8] dark:bg-amber-900/20"
          value={String(stats.pendingComplaints).padStart(2, "0")}
          label="Pending Complaints"
          badge="URGENT"
          badgeColor="bg-red-50 text-red-500"
        />
        <StatCard
          icon={Star}
          iconBg="bg-[#d5e3ff] dark:bg-purple-900/20"
          value={`${stats.averageRating} / 5`}
          label="Avg Feedback Rating"
        />
        <StatCard
          icon={UserCheck}
          iconBg="bg-[#d5e3ff] dark:bg-green-900/20"
          value={stats.newToday}
          label="New Registrations Today"
        />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent complaints */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#083067] dark:text-white">
              Recent Complaint Logs
            </h2>
            <button
              onClick={() => navigate("/warden-dashboard/complaints")}
              className="text-[10px] sm:text-xs text-blue-400 hover:underline"
            >
              VIEW ALL
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px] sm:text-xs">
              <thead>
                <tr className="text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left pb-3 font-medium">Student</th>
                  <th className="text-left pb-3 font-medium">Title</th>
                  <th className="text-left pb-3 font-medium">Priority</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-400">
                      No complaints yet
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                      <td className="py-3 text-[#083067] dark:text-white font-medium">
                        {c.userId?.name || "Student"}
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                        {c.title}
                      </td>
                      <td className="py-3">
                        <PriorityBadge priority={c.priority} />
                      </td>
                      <td className="py-3">
                        <StatusBadge status={c.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New registrations */}
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#083067] dark:text-white">
              New Registrations
            </h2>
          </div>

          <div className="space-y-3">
            {students.length === 0 ? (
              <p className="text-[10px] sm:text-xs text-gray-400 text-center py-4">
                No students yet
              </p>
            ) : (
              students.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl cursor-pointer"
                  onClick={() => navigate("/warden-dashboard/students")}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-[#083067] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
                    {s.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold text-[#083067] dark:text-white truncate">
                      {s.name}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {s.room !== "Not Assigned" ? `Room ${s.room}` : "Room not assigned"}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-300 flex-shrink-0">
                    {s.date}
                  </span>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => navigate("/warden-dashboard/students")}
            className="w-full mt-4 py-2 text-[10px] sm:text-xs font-medium text-[#083067] dark:text-white border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
          >
            All New Students
          </button>
        </div>

      </div>
    </div>
    </>

  );
}