import * as React from 'react';
import { authService } from '../services/LoginService';

interface ProfilePageProps {
  onLogout: () => void;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  token: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const data = await authService.getMe();
        setUser(data as UserData);
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center my-5">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center my-5">User not found.</p>;
  }

  return (
    <div className="profile-container">
      <img src={user.image} alt="Profile" className="profile-avatar" />
      <div className="profile-info">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
