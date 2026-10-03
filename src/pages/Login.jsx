import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mindwell-backend-rdph.onrender.com/api/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          MindWell
        </Link>

        <h1>Welcome back</h1>
        <p className="auth-subtitle">
          Login to continue your wellness journey.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="primary-btn auth-button">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;