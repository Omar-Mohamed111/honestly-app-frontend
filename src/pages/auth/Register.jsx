import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService.js";
import Alert from "../../components/Alert.jsx";

export default function Register() {
  // 1. Component state holds what the user typed.
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // 2. Every keystroke updates state.
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // 3. Submit sends the API request and updates state with the result.
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await register(form);
      setSuccess("Account created. Check your email for the code.");
      setTimeout(() => navigate("/verify-otp", { state: { email: form.email } }), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h1>Create your account</h1>
      <Alert error={error} success={success} />
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Username
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
      <p className="muted">
        Already have a code? <Link to="/verify-otp">Verify your email</Link>
      </p>
    </section>
  );
}
