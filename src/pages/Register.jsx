import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await registerUser(form);
      setMessage("✅ Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="auth-page">
      {/* 🍭 Floating sweets */}
      <ul className="floating-sweets">
        <li>🍩</li>
        <li>🍬</li>
        <li>🍪</li>
        <li>🍭</li>
        <li>🍫</li>
        <li>🧁</li>
        <li>🍡</li>
      </ul>

      {/* Big background title */}
      <h1 className="bg-title">Sweet Shop Management</h1>

      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Create Account 🍬</h2>

          <input
            name="username"
            placeholder="👤Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="📧Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <input
           
            name="password"
            type="password"
            placeholder="🔒Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>

          {message && <p className="message">{message}</p>}

          <p className="switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
