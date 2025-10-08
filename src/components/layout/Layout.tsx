import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
