import API from "../services/api";

export async function deleteLead({
  leadId,
  leads,
  setLeads,
  setStats,
}) {
  const leadToDelete = leads.find((l) => l._id === leadId);
  if (!leadToDelete) return;

  await API.delete(`/leads/${leadId}`);

  setLeads((prev) =>
    prev.filter((lead) => lead._id !== leadId)
  );

  setStats((prev) => ({
    ...prev,
    total: prev.total - 1,
    [leadToDelete.status]:
      prev[leadToDelete.status] - 1,
  }));
}
