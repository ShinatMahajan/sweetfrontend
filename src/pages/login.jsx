import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
      const res = await loginUser(form);

      // 🔐 save token
      localStorage.setItem("token", res.token);

      setMessage("✅ Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch  {
      setMessage("❌ Invalid credentials");
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

      {/* Background title */}
      <h1 className="bg-title">Sweet Shop Management</h1>

      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Login 🍭</h2>

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
            placeholder="📧Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          {message && <p className="message">{message}</p>}

          <p className="switch-text">
            Don&apos;t have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
