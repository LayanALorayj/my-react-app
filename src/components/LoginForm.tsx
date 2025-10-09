import { useState } from "react";
import { useAuth } from "../services/AuthContext";

export default function LoginPage() {
  const { user, login, logout } = useAuth(); // ← الآن logout موجود
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
    } catch (err) {
      console.error(err);
      alert("Password or user wrong");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="profile-container">
        <h2 className="profile-title">Welcome, {user.firstName}</h2>
        <div className="profile-card">
          <img
            className="profile-avatar"
            src={user.image || "https://via.placeholder.com/120"}
            alt="Profile"
          />
          <div className="profile-info">
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        </div>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
