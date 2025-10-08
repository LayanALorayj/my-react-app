import * as React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/" className="internal-link">Home</Link>
        <a href="https://edugate.ksu.edu.sa/ksu/init" className="external-link">
          <i className="bi bi-mortarboard-fill me-2"></i>Visit KSU Portal
        </a>
      </div>
    </footer>
  );
};

export default Footer;