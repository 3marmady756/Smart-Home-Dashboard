
import { ReactNode } from "react";
import Navigation from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // لا تعرض القائمة الجانبية في صفحة تسجيل الدخول
  const isLoginPage = location.pathname === "/login";
  
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className={`${isMobile ? 'pt-16' : 'md:ml-64'} px-4 py-6 md:p-8 min-h-screen`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
