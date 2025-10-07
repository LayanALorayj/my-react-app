import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container my-5 text-center">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="rounded-circle mx-auto mb-3"
        />
        <h2>{username}</h2>
        <p>مرحبًا بك في صفحتك الشخصية 🎉</p>
        <button className="btn btn-danger mt-3" onClick={handleLogout}>
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
