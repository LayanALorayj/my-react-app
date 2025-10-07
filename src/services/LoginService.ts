// src/services/LoginService.ts
import { API_CONFIG } from '../constants/api';

// تعريف الاستجابة المتوقعة من API
interface LoginResponse {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  token?: string;
  message?: string; // ✅ رسالة الخطأ لو فشل login
}

// واجهة المستخدم المخزنة محليًا
export interface UserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  token: string; // Access token
}

export const authService = {
  // دالة تسجيل الدخول
  async login(username: string, password: string): Promise<UserInfo> {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`;

    console.log('[authService] sending login request to', url, { username, password });

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }), // ✅ إرسال كل البيانات
    });

    // قراءة JSON من الاستجابة
    let data: LoginResponse;
    try {
      data = await response.json();
    } catch (e) {
      console.error('[authService] response not JSON', e);
      throw new Error('استجابة السيرفر ليست بصيغة JSON.');
    }

    console.log('[authService] response', response.status, data);

    // التحقق من نجاح الاستجابة ووجود token
    if (!response.ok || !data.token) {
      const serverMessage = data.message || 'اسم المستخدم أو كلمة المرور غير صحيحة.';
      throw new Error(serverMessage);
    }

    // إنشاء كائن المستخدم النهائي
    const userInfo: UserInfo = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      image: data.image || '',
      token: data.token as string,
    };

    // حفظ المستخدم في localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
    console.log('[authService] saved user to localStorage');

    return userInfo;
  },

  // جلب المستخدم المخزن من localStorage
  getUserInfo(): UserInfo | null {
    const raw = localStorage.getItem('loggedInUser');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as UserInfo;
      if (!parsed || !parsed.token) return null;
      return parsed;
    } catch (e) {
      console.error('[authService] parse error', e);
      return null;
    }
  },

  // تسجيل الخروج
  logout() {
    localStorage.removeItem('loggedInUser');
  },

  // جلب الـ access token بسهولة
  getAccessToken(): string | null {
    const user = this.getUserInfo();
    return user ? user.token : null;
  },
};
