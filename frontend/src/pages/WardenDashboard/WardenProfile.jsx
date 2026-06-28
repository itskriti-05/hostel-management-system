import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/PageHeader";
import { useAuth } from "../../context/AuthContext";
import { Mail, Phone, Building2 } from "lucide-react";

const WardenProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/warden/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9ff] dark:bg-[#0F1F2E]">
        <p className="text-[#083067] dark:text-white font-medium">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8f9ff] dark:bg-[#0F1F2E]">
        <p className="text-[#083067] dark:text-white font-medium">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9ff] dark:bg-[#0F1F2E] min-h-screen">
      <PageHeader title="Profile" />

      {/* Profile card */}
      <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-[#083067] flex items-center justify-center text-white font-bold text-xl">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#083067] dark:text-white">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-400">Warden</p>
          </div>
        </div>

        {/* Profile info */}
        <div className="space-y-4">
          <InfoRow icon={Mail} label="Email" value={profile.email} />
          <InfoRow icon={Phone} label="Contact" value={profile.contactNo} />
          <InfoRow icon={Building2} label="Hostel Type" value={profile.hostelType || "—"} />
        </div>
      </div>
    </div>
  );
};

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl">
      <Icon className="w-5 h-5 text-[#083067] dark:text-white flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[#083067] dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

export default WardenProfile;