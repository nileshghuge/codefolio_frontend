jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://codefolio-backend-txxm.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/builder");
      }, 500);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* Background decoration */}
      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      {/* Brand */}
      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <span className="logo-mark">
            &lt;/&gt;
          </span>

          <span>CodeFolio</span>
        </Link>
      </div>

      {/* Register Card */}
      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            +
          </div>

          <h1>Create your account</h1>

          <p>
            Start building your professional
            developer portfolio.
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="auth-form"
        >

          {/* Username */}
          <div className="auth-field">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="yourusername"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              required
            />

          </div>

          {/* Email */}
          <div className="auth-field">

            <label htmlFor="register-email">
              Email address
            </label>

            <input
              id="register-email"
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

          {/* Password */}
          <div className="auth-field">

            <label htmlFor="register-password">
              Password
            </label>

            <div className="password-wrapper">

              <input
                id="register-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="new-password"
                minLength="6"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          {/* Register button */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? (
              "Creating account..."
            ) : (
              <>
                Create account
                <span>→</span>
              </>
            )}
          </button>

        </form>

        {/* Message */}
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

        {/* Login */}
        <div className="auth-divider">
          <span></span>

          <p>
            Already have an account?
          </p>

          <span></span>
        </div>

        <Link
          to="/login"
          className="auth-secondary-button"
        >
          Sign in to CodeFolio
        </Link>

      </div>

      {/* Footer */}
      <p className="auth-footer">
        © {new Date().getFullYear()} CodeFolio ·
        Developer Portfolio Builder
      </p>

    </div>
  );
}

export default Register;

