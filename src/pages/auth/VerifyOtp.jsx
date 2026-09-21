import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../services/authService.js";
import Alert from "../../components/Alert.jsx";

export default function VerifyOtp() {
  const location = useLocation();
  // Register passes the email along, but the user can also type it.
  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await verifyOtp(form);
      setSuccess("Email verified. Taking you to log in.");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Verify your email</h1>
      <Alert error={error} success={success} />
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Code
          <input type="text" name="otp" value={form.otp} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Verifying…" : "Verify email"}
        </button>
      </form>
    </section>
  );
}
