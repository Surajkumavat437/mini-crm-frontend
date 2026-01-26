import toast from "react-hot-toast";
import {
  Users,
  UserPlus,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import LeadTable from "../components/LeadTable";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { useDashboardData } from "../hooks/useDashboardData";
import { useLineChartData } from "../hooks/useLineChartData";
import { deleteLead } from "../utils/deleteLead";

function Dashboard() {
  const {
    stats,
    leads,
    setLeads,
    setStats,
    loading,
  } = useDashboardData();

  const lineData = useLineChartData(leads);

  /* 
     DELETE LEAD (UI ONLY)
   */
  const handleDelete = (leadId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-200">
            Are you sure you want to delete this lead?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 text-sm rounded bg-slate-700 text-slate-200 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                try {
                  await deleteLead({
                    leadId,
                    leads,
                    setLeads,
                    setStats,
                  });

                  toast.dismiss(t.id);
                  toast.success("Lead deleted successfully");
                } catch {
                  toast.dismiss(t.id);
                  toast.error("Failed to delete lead");
                }
              }}
              className="px-3 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  /*
     SAFE EARLY RETURN
   */
  if (loading || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  /* 
     PIE CHART DATA (UPDATED)
   */
  const pieData = [
    { name: "New", value: stats.new, fill: "#60A5FA" },
    { name: "Contacted", value: stats.contacted, fill: "#FBBF24" },
    { name: "Converted", value: stats.converted, fill: "#34D399" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Lead overview and performance insights
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Total Leads" value={stats.total} icon={Users} />
        <StatCard title="New Leads" value={stats.new} icon={UserPlus} />
        <StatCard title="Contacted" value={stats.contacted} icon={PhoneCall} />
        <StatCard title="Converted" value={stats.converted} icon={CheckCircle2} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* PIE */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Lead Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                label={({ name, value }) => `${name} (${value})`}
                labelLine={false}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-6">
            Leads in Last 7 Days
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#94A3B8" />
              <YAxis allowDecimals={false} stroke="#94A3B8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#22D3EE"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <LeadTable leads={leads} onDelete={handleDelete} />
    </div>
  );
}

/* 
     STAT CARD (UNCHANGED)
 */
function StatCard({ title, value, icon }) {
  const Icon = icon;

  const styles = {
    "Total Leads":
      "from-indigo-600/30 to-indigo-500/10 border-indigo-500/40 text-indigo-400",
    "New Leads":
      "from-blue-600/30 to-blue-500/10 border-blue-500/40 text-blue-400",
    Contacted:
      "from-amber-600/30 to-amber-500/10 border-amber-500/40 text-amber-400",
    Converted:
      "from-emerald-600/30 to-emerald-500/10 border-emerald-500/40 text-emerald-400",
  };

  return (
    <div
      className={`rounded-2xl border bg-linear-to-br ${styles[title]} p-6 shadow-lg hover:-translate-y-1 transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <h2 className="text-4xl font-bold mt-2 text-white">
            {value}
          </h2>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700">
          <Icon size={28} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
