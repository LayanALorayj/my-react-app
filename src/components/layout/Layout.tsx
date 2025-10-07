import * as React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        {/* هنا يتم عرض محتوى الصفحة المحدد (Login page أو Profile page) */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default layout;