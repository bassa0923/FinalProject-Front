import React from "react";
import axios from "axios";

interface LogoutFormProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutForm: React.FC<LogoutFormProps> = ({ setLoggedIn }) => {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout");
      localStorage.removeItem("token");
      setLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default LogoutForm;
