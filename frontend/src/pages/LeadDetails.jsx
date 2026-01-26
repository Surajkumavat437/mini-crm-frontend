import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const res = await API.get(`/leads/${id}`);
        setLead(res.data.data);
        setStatus(res.data.data.status);
      } catch {
        toast.error("Failed to load lead details");
      } finally {
        setLoading(false);
      }
    };
    fetchLead();
  }, [id]);

  const handleUpdate = async () => {
    const isStatusChanged = status !== lead.status;
    const isNoteAdded = note.trim() !== "";

    if (!isStatusChanged && !isNoteAdded) {
      toast.error("Nothing to update");
      return;
    }
    try {
      setSaving(true);
      const res = await API.put(`/leads/${id}`, { status, note });
      setLead(res.data.data);
      setNote("");
      toast.success("Lead updated successfully");
      navigate("/dashboard");
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading lead...
      </div>
    );
  }

  if (!lead) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-900 text-white p-8">
      {/* BACK */}
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition mb-8"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-1 bg-slate-800/70 border border-slate-600/40 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 text-indigo-300">
            Lead Details
          </h2>

          <Info label="Name" value={lead.name} />
          <Info label="Email" value={lead.email} />
          <Info label="Phone" value={lead.phone || "—"} />
          <Info label="Source" value={lead.source} />
          <Info label="Message" value={lead.message || "—"} />
          <Info
            label="Created"
            value={new Date(lead.createdAt).toLocaleString()}
          />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* UPDATE */}
          <div className="bg-slate-800/70 border border-slate-600/40 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-cyan-300">
              Update Lead
            </h2>

            <label className="block text-sm text-slate-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full mb-4 bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-cyan-500"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>

            <label className="block text-sm text-slate-400 mb-1">
              Add Note
            </label>
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Follow-up notes..."
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2 resize-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="mt-6 bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-2 rounded-xl font-medium shadow-lg shadow-indigo-500/30 hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* NOTES */}
          <div className="bg-slate-800/70 border border-slate-600/40 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-emerald-300">
              Notes History
            </h2>

            {lead.notes.length === 0 ? (
              <p className="text-slate-400">No notes yet</p>
            ) : (
              <ul className="space-y-4">
                {lead.notes.map((n) => (
                  <li
                    key={n._id}
                    className="bg-slate-900/80 border border-slate-600 rounded-xl p-4"
                  >
                    <p className="text-slate-100">{n.text}</p>
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(n.date).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="mb-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="font-medium text-slate-100">{value}</p>
    </div>
  );
}

export default LeadDetails;
