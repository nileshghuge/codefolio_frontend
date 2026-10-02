import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

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
    throw new Error(
      data.message || "Login failed."
    );
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

return ( <div className="auth-page"> <div className="auth-card">

 
    <h1>Login</h1>

    <p>Welcome back to CodeFolio.</p>

    <form onSubmit={handleLogin}>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

    </form>

    {message && (
      <p className="auth-message">
        {message}
      </p>
    )}

    <p>
      Don't have an account?{" "}
      <Link to="/register">Register</Link>
    </p>

  </div>
</div>
 

);
}

export default Login;
