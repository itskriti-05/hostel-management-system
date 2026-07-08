import { useState, useEffect } from "react";
import api from "../../api/axios";
import PageHeader from "../../components/PageHeader";
import {
  Users, Play, Home, Plus, X,
  CheckCircle, Clock, AlertCircle
} from "lucide-react";

function StatusBadge({ status }) {
  const map = {
    INCOMPLETE: { label: "Incomplete", color: "bg-amber-50 text-amber-500" },
    COMPLETE: { label: "Complete", color: "bg-blue-50 text-blue-500" },
    CONFIRMED: { label: "Confirmed", color: "bg-emerald-50 text-emerald-600" },
  };
  const s = map[status] || map.INCOMPLETE;
  return (
    <span className={`text-[10px] px-2 py-1 rounded-full font-semibold ${s.color}`}>
      {s.label}
    </span>
  );
}

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [runMessage, setRunMessage] = useState("");

  // assign room modal
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [assigning, setAssigning] = useState(false);

  // add student modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [unmatchedStudents, setUnmatchedStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/matching/all");
      setMatches(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const runMatching = async () => {
    setRunning(true);
    setRunMessage("");
    try {
      const res = await api.post("/api/matching/run");
      setRunMessage(res.data.message);
      fetchMatches();
    } catch (err) {
      setRunMessage("Error running matching algorithm.");
    } finally {
      setRunning(false);
    }
  };

  const openAssignModal = (match) => {
    setSelectedMatch(match);
    setRoomId("");
    setShowAssignModal(true);
  };

  const handleAssignRoom = async () => {
    if (!roomId.trim()) return;
    setAssigning(true);
    try {
      await api.put(`/api/matching/${selectedMatch._id}/assign-room`, { roomId });
      setShowAssignModal(false);
      fetchMatches();
    } catch (err) {
      console.error(err);
    } finally {
      setAssigning(false);
    }
  };

  const openAddModal = async (match) => {
    setSelectedMatch(match);
    setSelectedStudentId("");
    setShowAddModal(true);
    // fetch all students then filter out already matched ones
    try {
      const [studentsRes, matchesRes] = await Promise.all([
        api.get("/api/warden/all-students"),
        api.get("/api/matching/all"),
      ]);
      const matchedIds = new Set(
        matchesRes.data.flatMap((m) => m.students.map((s) => s._id))
      );
      const unmatched = studentsRes.data.filter((s) => !matchedIds.has(s.id));
      setUnmatchedStudents(unmatched);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudentId) return;
    setAdding(true);
    try {
      await api.put(`/api/matching/${selectedMatch._id}/add-student`, {
        studentId: selectedStudentId,
      });
      setShowAddModal(false);
      fetchMatches();
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const roomTypeToNumber = { TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

  const incomplete = matches.filter((m) => m.status === "INCOMPLETE");
  const complete = matches.filter((m) => m.status === "COMPLETE");
  const confirmed = matches.filter((m) => m.status === "CONFIRMED");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#083067] dark:text-white font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#f8f9ff] dark:bg-[#0F1F2E] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Roommate Matches" />
        <button
          onClick={runMatching}
          disabled={running}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#083067] hover:bg-[#0a3d80] text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          <Play className="w-4 h-4" />
          {running ? "Running..." : "Run Matching Algorithm"}
        </button>
      </div>

      {runMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-sm px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {runMessage}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#083067] dark:text-white">{incomplete.length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Incomplete Groups</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#083067] dark:text-white">{complete.length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Awaiting Room Assignment</p>
          </div>
        </div>
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#083067] dark:text-white">{confirmed.length}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">Confirmed</p>
          </div>
        </div>
      </div>

      {/* Matches list */}
      {matches.length === 0 ? (
        <div className="bg-white dark:bg-[#1A2F42] rounded-2xl p-12 shadow-sm text-center">
          <Users className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-[#083067] dark:text-white mb-1">
            No matches yet
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-400">
            Click "Run Matching Algorithm" to start matching students.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => {
            const targetSize = roomTypeToNumber[match.roomType];
            const currentSize = match.students.length;
            return (
              <div
                key={match._id}
                className="bg-white dark:bg-[#1A2F42] rounded-2xl p-4 lg:p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={match.status} />
                    <span className="text-[10px] sm:text-xs text-gray-400">
                      {match.hostelType.replace("_", " ")} ·{" "}
                      {match.roomType} Room · {currentSize}/{targetSize} students
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-400">
                      {match.compatibilityScore}% compatible
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {match.status === "INCOMPLETE" && (
                      <button
                        onClick={() => openAddModal(match)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-600 rounded-lg text-[10px] sm:text-xs font-medium text-[#083067] dark:text-white hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Student
                      </button>
                    )}
                    {(match.status === "COMPLETE" || match.status === "INCOMPLETE") && (
                      <button
                        onClick={() => openAssignModal(match)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#083067] hover:bg-[#0a3d80] text-white rounded-lg text-[10px] sm:text-xs font-medium transition-colors"
                      >
                        <Home className="w-3.5 h-3.5" />
                        Assign Room
                      </button>
                    )}
                    {match.status === "CONFIRMED" && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] sm:text-xs font-medium">
                        <Home className="w-3.5 h-3.5" />
                        Room {match.roomId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Students list */}
                <div className="flex flex-wrap gap-3">
                  {match.students.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center gap-2 bg-gray-50 dark:bg-[#162636] px-3 py-2 rounded-xl"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-[#083067] flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                        {s.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs font-medium text-[#083067] dark:text-white">
                          {s.name}
                        </p>
                        <p className="text-[10px] text-gray-400">{s.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Assign Room Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#083067] dark:text-white">
                Assign Room
              </h3>
              <button onClick={() => setShowAssignModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-4">
              Assigning a room to {selectedMatch?.students?.length} students.
              This will update all their profiles.
            </p>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="e.g. A-204"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-white/5 text-sm text-[#083067] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#083067]/20 mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignRoom}
                disabled={assigning || !roomId.trim()}
                className="flex-1 py-2.5 rounded-xl bg-[#083067] hover:bg-[#0a3d80] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {assigning ? "Assigning..." : "Assign Room"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1A2F42] rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#083067] dark:text-white">
                Add Student to Group
              </h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mb-4">
              Select an unmatched student to add to this group.
            </p>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-white/5 text-sm text-[#083067] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#083067]/20 mb-4"
            >
              <option value="">Select student...</option>
              {unmatchedStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.email})
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                disabled={adding || !selectedStudentId}
                className="flex-1 py-2.5 rounded-xl bg-[#083067] hover:bg-[#0a3d80] text-white text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {adding ? "Adding..." : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}