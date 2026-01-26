import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password");
      setForm({
        email: "",
        password: ""
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Admin Login
        </h1>

        <p className="text-slate-400 text-sm text-center mb-6">
          Sign in to manage incoming leads
        </p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="off"
          className="w-full mb-4 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="off"
          className="w-full mb-6 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-indigo-500 to-cyan-500 py-3 rounded-xl text-white font-medium tracking-wide shadow-lg shadow-indigo-500/30 hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
