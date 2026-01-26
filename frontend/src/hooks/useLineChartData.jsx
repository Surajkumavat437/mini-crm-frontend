import { useMemo } from "react";

export function useLineChartData(leads) {
  const lineData = useMemo(() => {
    if (!leads.length) return [];

      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString();
    });

    const countByDate = leads.reduce((acc, lead) => {
      const date = new Date(lead.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return last7Days.map((date) => ({
      date,
      leads: countByDate[date] || 0,
    }));
  }, [leads]);

  return lineData;
}
