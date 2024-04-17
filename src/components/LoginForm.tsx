import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface LoginFormProps {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });

      const authToken = response.data.token;

      localStorage.setItem("token", authToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      setLoggedIn(true);

      navigate("/");
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.response?.data.error || "An error occurred");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <Link to="/" className="back-to-home">
        Back to HomePage
      </Link>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {token && <p style={{ color: "green" }}>Login successful</p>}
    </div>
  );
};

export default LoginForm;
