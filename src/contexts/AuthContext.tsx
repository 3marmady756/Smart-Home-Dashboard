
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // مستخدمين افتراضيين للنظام (في تطبيق حقيقي، ستكون هذه البيانات في قاعدة بيانات)
  const defaultUsers = [
    {
      id: "1",
      email: "admin@example.com",
      password: "Admin@123",
      name: "المسؤول",
      role: "admin"
    },
    {
      id: "2",
      email: "user@example.com",
      password: "User@123",
      name: "مستخدم",
      role: "user"
    }
  ];

  useEffect(() => {
    // عند تحميل التطبيق، تحقق من وجود جلسة محفوظة
    const storedUser = localStorage.getItem("smartHomeUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("smartHomeUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // محاكاة لعملية تسجيل الدخول بمستخدمين متعددين
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = defaultUsers.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        
        if (foundUser) {
          const userData: User = {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name,
            role: foundUser.role
          };
          setUser(userData);
          localStorage.setItem("smartHomeUser", JSON.stringify(userData));
          resolve();
        } else {
          reject(new Error("بيانات تسجيل الدخول غير صحيحة"));
        }
      }, 800);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    // محاكاة لعملية إنشاء حساب جديد
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // تحقق من أن البريد الإلكتروني غير مستخدم بالفعل
        const userExists = defaultUsers.find(
          u => u.email.toLowerCase() === email.toLowerCase()
        );
        
        if (userExists) {
          reject(new Error("البريد الإلكتروني مستخدم بالفعل"));
          return;
        }
        
        // إنشاء مستخدم جديد (في تطبيق حقيقي، سيتم حفظه في قاعدة البيانات)
        const newUser: User = {
          id: `${defaultUsers.length + 1}`,
          email,
          name,
          role: "user"
        };
        
        setUser(newUser);
        localStorage.setItem("smartHomeUser", JSON.stringify(newUser));
        resolve();
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartHomeUser");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
