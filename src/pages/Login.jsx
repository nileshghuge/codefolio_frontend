
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://codefolio-backend-txxm.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/builder");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <span className="logo-mark">&lt;/&gt;</span>
          <span>CodeFolio</span>
        </Link>
      </div>

      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-icon">↗</div>

          <h1>Welcome back</h1>

          <p>
            Sign in to continue building your
            developer portfolio.
          </p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">

          <div className="auth-field">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">
              Password
            </label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign in <span>→</span>
              </>
            )}
          </button>

        </form>

        {message && (
          <div
            className={`auth-message ${
              message.includes("successful")
                ? "success"
                : "error"
            }`}
          >
            {message}
          </div>
        )}

        <div className="auth-divider">
          <span></span>
          <p>New to CodeFolio?</p>
          <span></span>
        </div>

        <Link
          to="/register"
          className="auth-secondary-button"
        >
          Create an account
        </Link>

      </div>

      <p className="auth-footer">
        © {new Date().getFullYear()} CodeFolio ·
        Developer Portfolio Builder
      </p>

    </div>
  );
}

export default Login;

