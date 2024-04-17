import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface SignupFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupForm: React.FC<SignupFormProps> = ({ setLoggedIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/signup", {
        username,
        password,
      });
      setMessage(response.data.message);
      const loginResponse = await axios.post(
        "http://localhost:8000/auth/login",
        {
          username,
          password,
        }
      );
      const authToken = loginResponse.data.token;
      localStorage.setItem("token", authToken);
      setLoggedIn(true);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Signup</h2>
      <Link to="/" className="back-to-home">
        Back to HomePage
      </Link>
      <form onSubmit={handleSignup} className="signup-form">
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default SignupForm;
