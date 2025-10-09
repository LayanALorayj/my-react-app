import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "./LoginService";

// 👇 تعريف شكل البيانات داخل الـ Context
interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// 👇 إنشاء الـ Context نفسه
const AuthContext = createContext<AuthContextType | null>(null);

// 👇 مكوّن المزوّد (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  // 🔹 أول ما يشتغل التطبيق نحاول نجيب المستخدم من التخزين المحلي
useEffect(() => {
  const loadUser = async () => {
    try {
      const info = authService.getUserInfo();
      if (info) {
        const profile = await authService.getMe();
        setUser(profile);
      }
    } catch (err) {
      console.error("Error loading user:", err);
      authService.logout();
    }
  };
  loadUser();
}, []);


  // 🔹 تسجيل الدخول
  const login = async (username: string, password: string) => {
    await authService.login(username, password);
    const profile = await authService.getMe();
    setUser(profile);
  };

  // 🔹 تسجيل الخروج
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // 🔹 تمرير القيم لباقي المكونات
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 👇 هوك مخصص للوصول للـ Context بسهولة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
