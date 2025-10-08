import * as React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const loginLinkContent = isLoggedIn ? "Profile" : "Login";
  const loginLinkHref = isLoggedIn ? "/profile" : "/login";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fw-bold">Mini Typescript project</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
