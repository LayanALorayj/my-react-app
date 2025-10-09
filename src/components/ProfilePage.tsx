import { useAuth } from "../services/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  // لو المستخدم غير موجود، نعرض رسالة Loading
  if (!user) {
    return <p className="text-center my-5">Loading...</p>;
  }

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

