import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, leadsRes] = await Promise.all([
          API.get("/leads/stats"),
          API.get("/leads"),
        ]);

        setStats(statsRes.data.data);
        setLeads(leadsRes.data.data);
      } catch {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    leads,
    setLeads,
    setStats,
    loading,
  };
}
