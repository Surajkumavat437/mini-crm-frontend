import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    source: "website",
  });

  const [loading, setLoading] = useState(false);

  /* =======================
     VALIDATORS
  ======================= */
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) =>
    /^\d{10}$/.test(phone); // adjust length if needed

  /* =======================
     HANDLE CHANGE
  ======================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone: numbers only
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setForm({ ...form, phone: numericValue });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  /* =======================
     HANDLE SUBMIT
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email format check
    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (optional field)
    if (form.phone && !isValidPhone(form.phone)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      setLoading(true);

      await API.post("/leads", form);

      toast.success("Thank you! Our team will contact you shortly.", {
        duration: 5000,
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        source: "website",
      });
    } catch {
      toast.error("Something went wrong. Please try again.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-slate-900/70 border border-slate-700 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-xl">
        
        {/* LEFT CONTENT (UNCHANGED) */}
        <div className="text-slate-100 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Web & Software Solutions for Your Business
          </h1>

          <p className="text-slate-400 mb-6">
            We design and build websites, dashboards, and custom software
            tailored to your business needs.
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400">✔</span>
              <span>Custom web & full-stack development</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-indigo-400">✔</span>
              <span>Clear consultation & fast response</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-indigo-400">✔</span>
              <span>Secure handling of your information</span>
            </li>
          </ul>

          <p className="text-slate-500 text-sm mt-6">
            Tell us what you need — we’ll take it from there.
          </p>
        </div>

        {/* FORM (UNCHANGED STYLING) */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-white mb-2">
            Get in Touch
          </h2>

          <p className="text-slate-400 mb-6 text-sm">
            Fill out the form and our team will reach out to you.
          </p>

          <input
            name="name"
            placeholder="Full Name *"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address *"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            name="message"
            placeholder="Tell us about your requirement *"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 rounded-xl text-white font-medium tracking-wide shadow-lg shadow-indigo-500/30 hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
