import { useEffect, useState } from "react";
import api from "../../api/axios";

import PageHeader from "../../components/PageHeader";
import { MessageSquare, Star, Trophy } from "lucide-react";
import { Star as StarIcon } from "lucide-react";

const WardenFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    fiveStar: 0,
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);

    try {
      const res = await api.get("/api/feedback");
      const data = res.data;

      setFeedbacks(data);

      const total = data.length;

      const average =
        total > 0
          ? (
              data.reduce((sum, item) => sum + item.rating, 0) / total
            ).toFixed(1)
          : 0;

      const fiveStar = data.filter((item) => item.rating === 5).length;

      setStats({
        total,
        average,
        fiveStar,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#083067] dark:text-white font-medium">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8F9FF] dark:bg-[#0F1F2E] min-h-screen">
      <PageHeader title="Student Feedback" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-[#D8E7FF] rounded-xl flex items-center justify-center mb-3">
            <Star className="w-5 h-5 text-[#083067] dark:text-white" />
          </div>

          <h2 className="text-2xl font-bold text-[#083067] dark:text-white">
            {stats.average} / 5
          </h2>

          <p className="text-xs text-gray-400 mt-1">Average Rating</p>
        </div>

        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-[#D8E7FF] rounded-xl flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5 text-[#083067] dark:text-white" />
          </div>

          <h2 className="text-2xl font-bold text-[#083067] dark:text-white">
            {stats.total}
          </h2>

          <p className="text-xs text-gray-400 mt-1">Total Feedback</p>
        </div>

        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm">
          <div className="w-10 h-10 bg-[#D8E7FF] rounded-xl flex items-center justify-center mb-3">
            <Trophy className="w-5 h-5 text-[#083067] dark:text-white" />
          </div>

          <h2 className="text-2xl font-bold text-[#083067] dark:text-white">
            {stats.fiveStar}
          </h2>

          <p className="text-xs text-gray-400 mt-1">5 Star Reviews</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-sm p-5">
        <h2 className="text-sm font-semibold text-[#083067] dark:text-white mb-4">
          Student Feedback
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 text-left text-gray-500 uppercase text-xs">
                <th className="pb-3">Student</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Feedback</th>
                <th className="pb-3">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {feedbacks.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-400"
                  >
                    No feedback available.
                  </td>
                </tr>
              ) : (
                feedbacks.map((feedback) => (
                  <tr
                    key={feedback._id}
                    className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-[#083067] flex items-center justify-center text-white font-semibold">
                          {feedback.userId?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <p className="font-medium text-[#083067] dark:text-white">
                            {feedback.userId?.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {feedback.userId?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      {renderStars(feedback.rating)}
                    </td>

                    <td className="py-4 max-w-md">
                      <p className="truncate text-gray-600 dark:text-gray-300">
                        {feedback.comment}
                      </p>
                    </td>

                    <td className="py-4 text-gray-500 text-sm">
                      {new Date(feedback.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WardenFeedback;