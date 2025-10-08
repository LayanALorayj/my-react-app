import { API_CONFIG } from '../constants/api';
import { STORAGE_KEYS } from '../constants/enums';

interface LoginResponse {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  gender?: string;
  accessToken?: string;
  message?: string;
}

export interface UserInfo {
  token: string;
}

export interface UserProfile extends UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export const authService = {
  async login(username: string, password: string): Promise<UserInfo> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data: LoginResponse = await response.json();

    if (!response.ok || !data.accessToken) {
      throw new Error(data.message || 'Invalid username or password');
    }

    const userInfo: UserInfo = {
      token: data.accessToken,
    };

    localStorage.setItem(STORAGE_KEYS.loggedInUser, JSON.stringify(userInfo));
    return userInfo;
  },

  getUserInfo(): UserInfo | null {
    const raw = localStorage.getItem(STORAGE_KEYS.loggedInUser);
    if (!raw) return null;
    try {
      const info = JSON.parse(raw) as UserInfo;
      if (!info || !info.token) return null;
      return info;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.loggedInUser);
  },

  getAccessToken(): string | null {
    const user = this.getUserInfo();
    return user ? user.token : null;
  },

  async getMe(): Promise<UserProfile> {
    const user = this.getUserInfo();
    if (!user) throw new Error('No user logged in');

    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ME}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + user.token,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch user info');

    const data = await res.json();
    return { 
      token: user.token,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: data.image, 
    };
  }
}
