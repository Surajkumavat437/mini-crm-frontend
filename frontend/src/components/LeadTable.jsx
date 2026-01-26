import { Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function LeadTable({ leads, onDelete }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="text-slate-400 text-center py-10">
        No leads found
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden">
      {/* ✅ MOBILE SCROLL CONTAINER */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full">
          <thead className="bg-slate-800">
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-t border-slate-700 hover:bg-slate-800/50 transition"
              >
                <TableCell className="capitalize"> {lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell className="capitalize">
                  {lead.source}
                </TableCell>

                <TableCell className="capitalize">
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell>
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-4">
                    {/* VIEW */}
                    <Link
                      to={`/leads/${lead._id}`}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="flex items-center   gap-1 pl-2 text-red-400 hover:text-red-300"
                    >
                      Delete
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== UI HELPERS ===== */

function StatusBadge({ status }) {
  const styles = {
    new: "bg-blue-500/20 text-blue-400",
    contacted: "bg-amber-500/20 text-amber-400",
    converted: "bg-green-500/20 text-green-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="text-left px-4 py-3 text-sm text-slate-400 font-medium whitespace-nowrap">
      {children}
    </th>
  );
}

function TableCell({ children, className = "" }) {
  return (
    <td
      className={`px-4 py-3 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
}

export default LeadTable;
