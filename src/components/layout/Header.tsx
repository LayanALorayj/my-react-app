import * as React from 'react';
import { Link } from 'react-router-dom';

// تعريف الـ Props (إذا كنت ستمرر حالة تسجيل الدخول، سيكون ضرورياً)
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // مثال على كيفية جلب حالة المستخدم من localStorage
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem("loggedInUser"));

  React.useEffect(() => {
    // هذه الدالة ستستمع لتغييرات حالة تسجيل الدخول لو احتجت تحديثها
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("loggedInUser"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loginLinkContent = isLoggedIn ? "Profile" : "Login";
  const loginLinkHref = isLoggedIn ? "/profile" : "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          {/* <img src="assets/img/ksu-logo.png" ... /> */}
          <span className="fw-bold">King Saud University</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* باقي الروابط */}
            <li className="nav-item">
              <Link className={`nav-link ${isLoggedIn ? '' : 'active'}`} to={loginLinkHref}>
                {loginLinkContent}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;