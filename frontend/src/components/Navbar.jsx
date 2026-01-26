import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center sticky top-0 z-50 ">
      <Link to="/" className="text-white font-bold text-lg">
        MiniCRM
      </Link>

      <div className="flex items-center gap-4">
        {!token ? (
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Admin Login
          </Link>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white transition"
            >
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
