import * as React from 'react';
import LoginForm from '../components/LoginForm';
import ProfilePage from '../components/ProfilePage';
import Layout from '../components/layout/Layout';
import { authService } from '../services/LoginService';

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => !!authService.getUserInfo());

  const handleLoginSuccess = React.useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = React.useCallback(() => {
    authService.logout();
    setIsLoggedIn(false);
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      {isLoggedIn ? (
        <ProfilePage onLogout={handleLogout} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </Layout>
  );
};

export default HomePage;
