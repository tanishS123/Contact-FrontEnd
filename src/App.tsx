import React, { useState, type ChangeEvent, type FormEvent } from "react";

const API_URL = "https://contact-backend-4kru.onrender.com/api/users/message";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  message: string;
}

const App: React.FC = () => {
  const [form, setForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || "Something went wrong.");
      } else {
        setStatus("Message sent successfully ✅");

        // reset
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          companyName: "",
          message: "",
        });
      }
    } catch (err) {
      setStatus("Server se connect nahi ho paya ⚠");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050816] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0b1020] border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Heading */}
          <h1 className="text-2xl font-semibold mb-2">Contact Us</h1>

          {/* First / Last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-200">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full rounded-xl bg-[#141827] border border-[#252b3d] px-3 py-2.5 text-sm outline-none focus:border-[#5e8cff] focus:ring-2 focus:ring-[#5e8cff66]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-200">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full rounded-xl bg-[#141827] border border-[#252b3d] px-3 py-2.5 text-sm outline-none focus:border-[#5e8cff] focus:ring-2 focus:ring-[#5e8cff66]"
              />
            </div>
          </div>

          {/* Work Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-200">
              Work Email *
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@company.com"
              required
              className="w-full rounded-xl bg-[#141827] border border-[#252b3d] px-3 py-2.5 text-sm outline-none focus:border-[#5e8cff] focus:ring-2 focus:ring-[#5e8cff66]"
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-200">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Acme Corp"
              className="w-full rounded-xl bg-[#141827] border border-[#252b3d] px-3 py-2.5 text-sm outline-none focus:border-[#5e8cff] focus:ring-2 focus:ring-[#5e8cff66]"
            />
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-200">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your security needs..."
              rows={4}
              required
              className="w-full rounded-xl bg-[#141827] border border-[#252b3d] px-3 py-2.5 text-sm outline-none resize-none focus:border-[#5e8cff] focus:ring-2 focus:ring-[#5e8cff66]"
            />
          </div>

          {/* Status text */}
          {status && (
            <p className="text-sm text-center text-gray-300">{status}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full py-3 text-sm font-semibold shadow-[0_15px_35px_rgba(0,0,0,0.8)] bg-gradient-to-r from-[#6b5bff] via-[#4cc3ff] to-[#41f3c2] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* Footer text */}
          <p className="mt-4 text-[11px] text-center text-gray-400">
            By submitting this form, you agree to our Privacy Policy and Terms
            of Service.
          </p>
        </form>
      </div>
    </div>
  );
};

export default App;
